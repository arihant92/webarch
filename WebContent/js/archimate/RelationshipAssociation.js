function RelationshipAssociation(){
	this.end = null;
	this.dash_array = null;
}

RelationshipAssociation.prototype = new Relationship();
RelationshipAssociation.prototype.constructor = RelationshipAssociation;

RelationshipAssociation.prototype.addTo = function(c, start, end, from, to, id){
	Relationship.prototype.addTo.call(this, c, start, end, from, to, id);
	
	//special things like add the points for the arrow heads
	
}