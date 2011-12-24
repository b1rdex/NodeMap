/*
 * nodemap.js
 * Author: Niki Liu
 * Website: http://about.me/nikiliu
 */

// The new page structure will be stored in this
var mappedNodes = '';

// Get the root node of the page, most of the time
// it will be <html>
var rootNode = document.all[0];

// Map all the nodes in the root node recursively
mapNodes(rootNode);

/*
 * This function displays a node's tagName in a div
 * and repeats the process for every child element
 * recursively.
 */
function mapNodes(node) {
    // Prevent text from being processed
    if (node.tagName != undefined) {
        mappedNodes += '<div class="node">' + node.tagName + '</div>';
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
document.head.innerHTML = '<meta charset="utf-8" />';

// Display the entire node map
document.body.innerHTML = '<ul class="nodemap"><li>' +
                          mappedNodes +
                          '</li></ul>';