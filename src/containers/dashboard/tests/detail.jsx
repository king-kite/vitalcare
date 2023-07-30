/* eslint-disable no-mixed-spaces-and-tabs */
import { DeleteOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import Container from '../../../components/container';
import DeleteTest from '../../../components/tests/delete-test';
import routes from '../../../config/routes';
import { useGetTestQuery } from '../../../store/features/api/tests';

function Detail() {
	const { id } = useParams();

	const { data, isLoading } = useGetTestQuery(id, {
		skip: id === undefined,
	});

	const navigate = useNavigate();

	const info = React.useMemo(
		() =>
			data
				? [
						{
							title: "Patient's First Name",
							value: data.patient?.first_name || '-----------',
						},
						{
							title: "Patient's Last Name",
							value: data.patient?.last_name || '-------------',
						},
						{
							title: "Patient's Email Address",
							value: data.patient?.email || '----------------',
						},
						{
							title: 'Gender',
							value: data.patient
								? data.patient.gender === 'M'
									? 'Male'
									: 'Female'
								: '-------',
						},
						{
							title: 'Height',
							value: data.height,
						},
						{
							title: 'Weight',
							value: data.weight,
						},
						{
							title: 'Pulse/Heart Rate',
							value: data.pulse,
						},
						{
							title: 'Temperature',
							value: data.temperature,
						},
						{
							title: 'Phone number',
							value: data.patient?.phone || '-----------',
						},
						{
							title: 'Created At',
							value: data.created_at,
						},
				  ]
				: [],
		[data]
	);

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<Spin spinning size="large" />
			</div>
		);

	// No data found
	if (!data) return <Navigate to="/404" />;

	return (
		<Container
			image={{
				url: data.patient?.image,
				alt: data.patient
					? data.patient.first_name[0] + ' ' + data.patient.last_name[0]
					: undefined,
			}}
			title="Test Information"
		>
			<h1 className="font-bold my-2 text-gray-700 text-lg">{data.full_name}</h1>
			<div className="sm:flex sm:items-center">
				<div className="my-4 sm:my-0">
					<DeleteTest
						className="cursor-pointer"
						testId={id}
						shape="default"
						onSuccess={() => navigate(routes.TESTS_PAGE)}
						icon={
							<span className="mr-2 text-gray-700 text-sm md:text-base">
								<DeleteOutlined />
							</span>
						}
						size="large"
						type="default"
					>
						<span className="text-gray-700 text-sm md:text-base">Delete</span>
					</DeleteTest>
				</div>
			</div>
			<hr className="border-gray-100 my-4" />
			<div>
				<div>
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						Patient&rsquo;s Test/Diagnosis Information
					</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						View test/diagnosis data on this patient.
					</p>
				</div>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-100 lg:grid lg:grid-cols-2">
						{info.map((detail, index) => (
							<div key={index} className="px-4 py-6">
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
		</Container>
	);
}

export default Detail;
