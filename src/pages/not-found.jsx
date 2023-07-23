import { Link } from 'react-router-dom';

import routes from '../config/routes';

function Page() {
	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-primary-600">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Sorry, we couldn&apos;t find the page you&apos;re looking for.
				</p>
				<div className="gap-6 mt-10 flex flex-col items-center justify-center sm:flex-row">
					<Link
						to={routes.HOME_PAGE}
						className="rounded-md no-underline bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
					>
						Go back home
					</Link>
					<Link
						to={routes.CONTACT_PAGE}
						className="text-sm no-underline hover:underline font-semibold text-gray-900"
					>
						Contact support <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</main>
	);
}

export default Page;
