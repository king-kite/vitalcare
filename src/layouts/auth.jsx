import { Button } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import routes from '../config/routes';

function AuthLayout() {
	return (
		<div className="w-full">
			<div className="h-full hidden min-h-screen w-full">
				<img
					className="h-full w-full"
					src="/images/auth-bg.jpg"
					alt="Vitalcare"
				/>
			</div>
			<div className="bg-gray-100 min-h-[100vh] w-full">
				<div className="bg-white p-4 shadow-lg">
					<div className="flex items-center justify-between max-w-sm mx-auto">
						<div className="h-[30px] w-[150px]">
							<img
								className="h-full w-full"
								src="/images/vitalcare-logo.png"
								alt="Vitalcare"
							/>
						</div>
						<div className="">
							<Link to={routes.HOME_PAGE}>
								<Button size="middle" type="primary">
									<span className="text-xs md:text-sm">Home</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center p-6">
					<div className="bg-white max-w-sm p-6 rounded-md shadow-lg w-full">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;