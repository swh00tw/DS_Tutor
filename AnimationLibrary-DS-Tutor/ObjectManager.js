function ObjectManager() {
  this.Nodes = [];
  this.Edges = [];
  this.BackEdges = [];
  this.highlightList = [];
  this.stage = new createjs.Stage("canvas");

  //TODO
  this.draw = function () {
    //TODO
    //亂打的
    for (var i = 0; i < this.Nodes.length; i++) {
      this.Nodes[i].draw(this.stage);
    }

    for (var i = 0; i < this.Edges.length; i++) {
      if (this.Edges[i].length > 0) {
        for (var j = 0; j < this.Edges[i].length; j++) {
          this.Edges[i][j].draw(this.stage);
        }
      }
    }
  };

  this.addNodeObject = function (objectID, objectLabel) {
    if (this.Nodes[objectID] != null && this.Nodes[objectID] != undefined) {
      throw (
        "addNodeObject:Object with same ID (" +
        String(objectID) +
        ") already Exists!"
      );
    }
    var newNode = new AnimatedNode(objectID, objectLabel);
    this.Nodes[objectID] = newNode;
  };

  this.setNodePosition = function (objectID, newX, newY) {
    this.Nodes[objectID].setXY(newX, newY);
  };

  this.addLabelObject = function (objectID, objectLabel) {
    if (this.Nodes[objectID] != null && this.Nodes[objectID] != undefined) {
      throw new Error("addLabelObject: Object Already Exists!");
    }
    var newLabel = new AnimatedLabel(objectID, objectLabel);
    this.Nodes[objectID] = newLabel;
  };

  this.pulsehighlight;

  this.addHighlightNode = function (node) {
    this.highlightList.push(node);
  };

  this.clearHighlightList = function () {
    this.highlightList = [];
  };

  //highlight all nodes in this.highlightList //used in OM.draw()
  this.sequenceHighlight = function (ArrayOfNodes, stage) {
    var i = 0;
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.framerate = 1;
    function handleTick() {
      if (i == ArrayOfNodes.length - 1) {
        createjs.Ticker.removeEventListener("tick", handleTick);
      }
      ArrayOfNodes[i].highlight(stage);
      i++;
    }
  };

  this.connectEdge = function (objectIDfrom, objectIDto) {
    var fromObj = this.Nodes[objectIDfrom];
    var toObj = this.Nodes[objectIDto];
    if (fromObj == null || toObj == null) {
      throw "Tried to connect two nodes, one didn't exist!";
    }
    var l = new Line(fromObj, toObj);
    if (
      this.Edges[objectIDfrom] == null ||
      this.Edges[objectIDfrom] == undefined
    ) {
      this.Edges[objectIDfrom] = [];
    }
    if (
      this.BackEdges[objectIDto] == null ||
      this.BackEdges[objectIDto] == undefined
    ) {
      this.BackEdges[objectIDto] = [];
    }
    this.Edges[objectIDfrom].push(l);
    this.BackEdges[objectIDto].push(l);
  };
}
