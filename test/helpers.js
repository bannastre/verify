const dob = { name: 'dob', data: { day: 28, month: 10, year: 1983 } };

const address = {
  name: 'address',
  data: {
    organisation_name: 'Jigsaw XYZ', // Company
    premise: 'Moorlands, Block E', // Apartment, Suite, Box number, etc.
    thoroughfare: '5-23 Old Street', // Street address
    locality: 'London', // City / Town
    administrative_area: 'Greater London', // State / Province / Region (ISO code when available)
    postal_code: 'EC1V 9HL', // Postal code / ZIP Code
    country: 'UK' // Country (always required, 2 character ISO code)
  }
};


module.exports = {
  dob,
  address
};

