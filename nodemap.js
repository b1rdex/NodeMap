/*
 * nodemap.js
 * Author: Niki Liu
 * Website: http://about.me/nikiliu
 */

/*
 * This function displays a node's tagName in a div
 * and repeats the process for every child element
 * recursively. New unordered lists are created for
 * every child node of the given node.
 */
function mapNodes(node) {
    // Store each node's information
    var mappedNodes = '<li><div class="node">' + node.tagName;

    // Add an attributes div if the node has attributes
    if (node.attributes.length > 0) {
        var nodeAttributes = '';
        for (var i = 0; i < node.attributes.length; i++) {
            nodeAttributes += '<p>' + node.attributes[i].name + ': ' +
                                      node.attributes[i].value + '</p>';
        }
        mappedNodes += '<div class="attributes">' + nodeAttributes + '</div>';
    }
    mappedNodes += '</div>';
    
    // Run the function again for every child node
    if (node.childNodes.length > 1) { // Set to 1 to ignore text nodes
        mappedNodes += '<ul class="nodemap">';
        for (var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].tagName != undefined) { // Ignore text nodes
                mappedNodes += mapNodes(node.childNodes[i]);
            }
        }
        mappedNodes += '</ul>';
    }
    return mappedNodes += '</li>';
}

/*
 * This function recursively draws lines between every node
 * and its child nodes on an HTML5 canvas.
 */
function drawLines(_nodeMap, _ctx) {
    // _nodeMap.childNodes[i] is the current list item
    // _nodeMap.childNodes[i].childNodes[0] is the node div
    // _nodeMap.childNodes[i].childNodes[1] is the submap, if it exists
    setTimeout(function() { // Required for draw to work, not sure why
        for (var i = 0; i < _nodeMap.childNodes.length; i++) {
            if (_nodeMap.childNodes[i].childNodes[1] != null) {
                for (var j = 0; j < _nodeMap.childNodes[i].childNodes[1].childNodes.length; j++) {
                    _ctx.beginPath();
                    _ctx.moveTo(_nodeMap.childNodes[i].childNodes[0].offsetLeft+32,
                                _nodeMap.childNodes[i].childNodes[0].offsetTop+32);
                    _ctx.lineTo(_nodeMap.childNodes[i].childNodes[1].childNodes[j].childNodes[0].offsetLeft+32,
                                _nodeMap.childNodes[i].childNodes[1].childNodes[j].childNodes[0].offsetTop+32);
                    _ctx.stroke();
                }
                drawLines(_nodeMap.childNodes[i].childNodes[1], _ctx);
            }
        }
    }, 0);
}

// Create the node map
var rootNode = document.all[0];
var nodeMap = document.createElement('ul');
nodeMap.setAttribute('class', 'nodemap');
nodeMap.innerHTML = mapNodes(rootNode);

// Create a canvas that draws lines connecting nodes
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.setAttribute('id', 'nodelines');

// Clear the page's <head> and <body> and display the node map,
// then display the canvas and node map.
document.head.innerHTML = '';
document.body.innerHTML = '';
document.body.appendChild(canvas);
document.body.appendChild(nodeMap);

// Set the dimensions of the canvas to match the node map's.
// The time out is required for some strange reason.
setTimeout(function() {
    canvas.width = nodeMap.offsetWidth;
    canvas.height = nodeMap.offsetHeight;
}, 0);

drawLines(nodeMap, ctx);