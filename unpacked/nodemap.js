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
            var atb = node.attributes[i];
            nodeAttributes += '<p>' + atb.name + ': ' + atb.value + '</p>';
        }
        mappedNodes += '<div class="attributes">' + nodeAttributes + '</div>';
    }
    mappedNodes += '</div>';
    
    // Run the function again for every child node
    if (node.childNodes.length > 0) {
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
    setTimeout(function() { // Required for some reason
        // Repeat for every list item in _nodeMap
        for (var i = 0; i < _nodeMap.childNodes.length; i++) {
            if (_nodeMap.childNodes[i].childNodes[1] != null) { // Prevent null pointers
                // Define individual elements
                var currentListItem = _nodeMap.childNodes[i];
                var nodeDiv = currentListItem.childNodes[0];
                var subMap = currentListItem.childNodes[1];
                
                // Repeat for every child node in the submap
                for (var j = 0; j < subMap.childNodes.length; j++) {
                    var subNode = subMap.childNodes[j].childNodes[0];
                    _ctx.beginPath();
                    _ctx.moveTo(nodeDiv.offsetLeft+32, nodeDiv.offsetTop+32);
                    _ctx.lineTo(subNode.offsetLeft+32, subNode.offsetTop+32);
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

// Create the backlink
var backlink = document.createElement('a');
backlink.setAttribute('href', 'javascript:window.location.reload()');
backlink.setAttribute('style', 'position:absolute;left:1em;top:1em;font-size:1.6em;')
backlink.innerHTML = '← Take me back!';

// Create a canvas that draws lines connecting nodes
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

// Clear the page's <head> and <body> and display the node map,
// then display the canvas and node map.
document.head.innerHTML = '';
document.body.innerHTML = '';
document.body.appendChild(canvas);
document.body.appendChild(nodeMap);
document.body.appendChild(backlink);

// Set the dimensions of the canvas to match the node map's.
setTimeout(function() { // Required for some reason
    canvas.width = nodeMap.offsetWidth;
    canvas.height = nodeMap.offsetHeight;
}, 0);

// Draw lines between nodes
drawLines(nodeMap, ctx);