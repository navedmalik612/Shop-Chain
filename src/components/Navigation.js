import { ethers } from 'ethers'

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (
        <nav>
            <div className='nav__brand'>
                <h1>Shopchain</h1>
            </div>

            <input
                type="text"
                className="nav__search"
                placeholder='Search'
            />

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}

            <ul className='nav__links'>
                <li><a href="#Housing & Furniture">Housing & Furniture</a></li>
                <li><a href="#Mobile">Mobile</a></li>
                <li><a href="#Appliances">Appliances</a></li>
                <li><a href="#Fashion">Fashion</a></li>
                <li><a href="#Nutrition & Healthcare">Nutrition & Healthcare</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;