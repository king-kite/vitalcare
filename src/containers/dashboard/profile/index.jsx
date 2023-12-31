import { EditOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { Alert, Button, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../../components/container';
import { ChangePassword, UpdateForm } from '../../../components/profile';
import { login } from '../../../store/features/auth';

function Profile() {
	const [open, setOpen] = React.useState(false);
	const [formType, setFormType] = React.useState();

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth.data);

	const data = React.useMemo(
		() => [
			{
				title: 'Full Name',
				value: auth?.displayName || '------',
			},
			{
				title: 'Email Address',
				value: auth?.email || '------',
			},
		],
		[auth]
	);

	const handlePasswordSuccess = React.useCallback(() => {
		setOpen(false);
		setFormType(null);
	}, []);

	const handleProfileSuccess = React.useCallback(
		(data) => {
			setOpen(false);
			setFormType(null);
			dispatch(login({ data }));
		},
		[dispatch]
	);

	return (
		<Container
			image={{
				url: auth.image,
				alt: auth?.displayName?.[0] || auth.email[0],
			}}
			title="Profile"
		>
			<h1 className="font-bold my-2 text-gray-700 text-lg">
				{auth?.displayName || auth?.email}
			</h1>
			<div className="sm:flex sm:items-center">
				<div className="my-4 sm:mr-2 sm:my-0">
					<Button
						className="cursor-pointer hover:text-primary-500"
						icon={
							<span className="mr-2 text-gray-100 text-sm md:text-base">
								<EditOutlined />
							</span>
						}
						onClick={() => {
							setFormType('profile');
							setOpen(true);
						}}
						size="large"
						type="primary"
					>
						<span className="text-gray-100 text-sm md:text-base">Update</span>
					</Button>
				</div>
				<div className="my-4 sm:ml-2 sm:my-0">
					<Button
						className="cursor-pointer hover:text-primary-500"
						icon={
							<span className="mr-2 text-gray-700 text-sm md:text-base">
								<SecurityScanOutlined />
							</span>
						}
						onClick={() => {
							setFormType('password');
							setOpen(true);
						}}
						size="large"
						type="default"
					>
						<span className="text-gray-700 text-sm md:text-base">
							Change Password
						</span>
					</Button>
				</div>
			</div>
			<hr className="border-gray-100 my-4" />
			<div>
				<div>
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						Profile Information
					</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						Personal details and application.
					</p>
				</div>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-100">
						{data.map((detail, index) => (
							<div key={index} className="p-4">
								<dt className="text-sm font-medium leading-6 text-gray-900 md:text-base md:font-semibold">
									{detail.title}
								</dt>
								<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:text-base md:font-medium">
									{detail.value}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
			<Modal open={open} onCancel={handlePasswordSuccess} footer={<></>}>
				{formType === 'profile' ? (
					<UpdateForm
						data={{
							full_name: auth.displayName,
							email: auth.email,
							image: auth.image,
						}}
						onSuccess={handleProfileSuccess}
					/>
				) : formType === 'password' ? (
					<ChangePassword onSuccess={handlePasswordSuccess} />
				) : (
					<Alert
						message="Unable to show form at the moment"
						closable
						onClose={handlePasswordSuccess}
						showIcon
						type="warning"
					/>
				)}
			</Modal>
		</Container>
	);
}

export default Profile;
