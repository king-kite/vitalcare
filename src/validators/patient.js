import { date, object, string } from 'yup';

const schema = object({
	first_name: string().required().label('First Name'),
	last_name: string().required().label('Last Name'),
	email: string().email().required().label('Email Address'),
	dob: date().required().label('Date of Birth'),
	address: string().required().label('Address'),
	gender: string().oneOf(['M', 'F']).required().label('Gender'),
	phone: string().required().label('Phone Number'),
	image: string().nullable().label('Image'),
	image_ref: string().nullable().label('Image Reference'),
});

export default schema;
