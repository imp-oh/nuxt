import { Outlet, Link, useLoaderData, redirect } from 'react-router-dom'
import { $fetch } from 'ofetch'

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                loader: homeLoader,
                element: <Home />,
            },
            {
                path: 'about',
                loader: aboutLoader,
                element: <About />,
            },
            {
                path: 'dashboard',
                loader: dashboardLoader,
                element: <Dashboard />,
            },
            {
                path: 'lazy',
                lazy: () => import('./lazy'),
            },
            {
                path: 'redirect',
                loader: redirectLoader,
            },
            {
                path: '*',
                element: <NoMatch />,
            },
        ],
    },
]

function Layout() {
    return (
        <div>
            <h1>Data Router Server Rendering Example</h1>

            <p>
                If you check out the HTML source of this page, you'll notice that it already contains the HTML markup of the app that was sent from the server, and all the loader data was pre-fetched!
            </p>

            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/lazy">Lazy</Link>
                    </li>
                    <li>
                        <Link to="/redirect">Redirect to Home</Link>
                    </li>
                    <li>
                        <Link to="/nothing-here">Nothing Here</Link>
                    </li>
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    )
}

const sleep = (n = 500) => new Promise(r => setTimeout(r, n))
const rand = () => Math.round(Math.random() * 100)

async function homeLoader() {
    await sleep()
    return { data: `Home loader - random value ${rand()}` }
}

function Home() {
    let data = useLoaderData()
    // console.log('home ===>', data)
    return (
        <div>
            <h2>Home</h2>
            <p>Loader Data: {data.data}</p>
        </div>
    )
}

function About() {
    let data = useLoaderData()

    return (
        <div>
            <h2>About</h2>
            {data.data.map((item, index) => {
                return <div key={`d-${index}`}>{item.name}</div>
            })}
            <div>asdasdas</div>
        </div>
    )
}

async function aboutLoader() {
    let res = await $fetch('http://127.0.0.1:5200/api/test/list')
    return res
}

async function dashboardLoader() {
    await sleep()
    return { data: `Dashboard loader - random value ${rand()}` }
}

function Dashboard() {
    let data = useLoaderData()
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Loader Data: {data.data}</p>
        </div>
    )
}

async function redirectLoader() {
    await sleep()
    return redirect('/')
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}
