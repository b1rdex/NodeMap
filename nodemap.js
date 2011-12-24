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
    if (node.childNodes.length > 1) { // This is 1 to ignore text nodes
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

// Create the node map
var rootNode = document.all[0];
var nodeMap = document.createElement('ul');
nodeMap.setAttribute('class', 'nodemap');
nodeMap.innerHTML = mapNodes(rootNode);

// Clear the page's <head> and <body> and display the node map
document.head.innerHTML = '';
document.body.innerHTML = '';
document.body.appendChild(nodeMap);