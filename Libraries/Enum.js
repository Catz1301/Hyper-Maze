function Enum(values){
    for( var i = 0; i < values.length; ++i ){
        this[values[i]] = i;
    }
    return this;
}

/** Use:
  * var myEnum = new Enum(['OBJ1', 'OBJ2', ...]);
  */
