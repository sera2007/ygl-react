export var formatObjectAddress = (obj) => {
	if (obj === undefined || obj === null || obj.address1 === undefined || obj.address1 === null || obj.address2 === undefined
		|| obj.address2 === null || obj.city === undefined || obj.city === null || obj.state === undefined || obj.state === null)
		return "";

	return formatAddress(obj.address1, obj.address2, obj.city, obj.state, obj.zip);
}

export var formatAddress = (adr1, adr2, city, state, zip) => {
	if (adr1 === null || adr1.length === 0 || city === null || city.length === 0 || state === null || state.length === 0)
		return "";

	var adr = adr1;
	
	if (adr2 !== null && adr2.length > 0)
		adr += ", " + adr2;
	
	adr += city + ", " + state;
	
	if (zip !== null && zip.length > 0)
		adr += " " + zip;

	return adr;
}