/*
 * nodemap.js
 * Author: Niki Liu
 * Website: http://about.me/nikiliu
 */

// Get the root node of the page
var rootNode = document.all[0];

// The new page structure will be stored in this
var mappedNodes = '';

// Map all the nodes in the root node recursively
mapNodes(rootNode);

/*
 * This function displays a node's tagName in a div
 * and repeats the process for every child element
 * recursively. New unordered lists are created for
 * every child node of the given node.
 */
function mapNodes(node) {
    // Prevent text nodes from being processed
    if (node.tagName != undefined) {
        // Add an attributes div if the node has attributes
        if (node.attributes.length > 0) {
            var nodeAttributes = '';
            for (var i = 0; i < node.attributes.length; i++) {
                nodeAttributes += '<p>' + node.attributes[i].name + ': ' +
                                  node.attributes[i].value + '</p>';
            }
            mappedNodes += '<div class="node">' + node.tagName +
                           '<div class="attributes">' + nodeAttributes + '</div>' +
                           '</div>';
        } else {
            mappedNodes += '<div class="node">' + node.tagName + '</div>';
        }
    }
    
    // Run the function again for every child node
    if (node.childNodes.length > 0) {
        mappedNodes += '<ul class="nodemap">';
        for (var i = 0; i < node.childNodes.length; i++) {
            mappedNodes += '<li>';
            mapNodes(node.childNodes[i]);
            mappedNodes += '</li>';
        }
        mappedNodes += '</ul>';
    }
}

// Clear the page's <head> tag to prevent stylesheet conflicts
document.head.innerHTML = '';

// Display the entire node map
document.body.innerHTML = '<ul class="nodemap"><li>' + mappedNodes + '</li></ul>';