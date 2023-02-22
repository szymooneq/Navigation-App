import { Button, Input } from 'antd';

function Form() {
	return (
		<>
			<Input type="text" id="fromLocation" placeholder="Basic usage" />
			<Input type="text" id="toLocation" placeholder="Basic usage" />
			<Button type="primary">Primary Button</Button>
		</>
	);
}

export default Form;
