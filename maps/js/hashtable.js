function HashTable() {
	this.table = {};
}

HashTable.prototype = {
	constructor: HashTable,
	put: function( key, value ) {
		this.table[ key ] = JSON.stringify( value );
	},
	get: function( key ) {
		if( this.table[ key ] == null ) {
			return false;
		} else {
			return JSON.parse( this.table[ key ] );
		}
	},
	count: function() {
		var count = 0;
		for( var i in this.table ) {
			count++;
		}
		return count;
	}
};