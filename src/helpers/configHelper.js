export var sourceName = (source) => {
	switch(source) {
		case "F": return "Internal";
		case "D": return "MRED";
		case "M": return "MLSPIN";
		case "S": return "YGL Network";
		case "Y": return "YGL Data Entry";
		default: return "Unknown";
	}
}

export var isMlsSource = (source) => {
	switch(source) {
		case "M":
		case "D":
			return true;
		default: 
			return false;
	}
}

export var nameDisplay = (person) => {
	var name = person.first_name;
	if (person.last_name && person.last_name.length > 0)
		name += " " + person.last_name;

	return name;
}

export var bedsDisplay = (config, bedStr) => {
	var beds = bedStr.split(',');
	var names = [];
	
	for (var i = beds.length - 1; i >= 0; i--) {
		for (var j = config.bed_types.length - 1; j >= 0; j--) {
			if (config.bed_types[j]["value"] === beds[i])
				names.push(config.bed_types[j]["name"]);
		}
	}
	names = names.reverse();

	return names.join(', ');
}

export var feeDisplay = (config, fee) => {
	for (var j = config.fee_types.length - 1; j >= 0; j--) {
		if (config.fee_types[j]["value"] === fee)
			return config.fee_types[j]["name"];
	}

	return "";
}