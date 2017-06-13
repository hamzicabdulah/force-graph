d3.json(
  'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json',
  function(data) {
    const nodes = data.nodes,
      links = data.links;

    //The svg element's height and width are dependent on the dimensions of the screen, to provide responsiveness
    const docWidth = document.documentElement.clientWidth,
      docHeight = document.documentElement.clientHeight,
      width = docWidth - 17.5,
      height = docHeight;

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const link = svg
      .selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link');

    const node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      //The nodes are foreign-object elements, so that they can have the flag images as their children
      .append('foreignObject')
      .attr('width', 32)
      .attr('height', 22)
      .attr('class', 'node')

    node
      .append('xhtml:img')
      //The classes are styled in the flags.min.css file
      .attr('class', (d) => 'flag flag-' + d.code);

    node.append('title')
      .text((d) => d.country);

    const force = d3.layout
      .force()
      .size([width, height])
      .nodes(nodes)
      .links(links)
      .on('tick', tick)
      .linkDistance(width / 25)
      .charge(-width / 23)
      .start();

    function tick() {
      node
        .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
        .call(force.drag);
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    }
  }
);
