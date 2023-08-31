import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import ShopChain from './abis/ShopChain.json'

// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [shopChain, setShopChain] = useState(null)

  const [account, setAccount] = useState(null)

  const [mobile, setMobile] = useState(null)
  const [furniture, setFurniture] = useState(null)
  const [appliances, setAppliances] = useState(null)
  const [fashion, setFashion] = useState(null)
  const [nutrition, setNutrition] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    // goerli == 0xFc851F657037F75f0e6e2bF784da08BC08FB385D
    const network = await provider.getNetwork()
    if (network.chainId !== 5) { 
      alert("Please switch to the Goerli test network on your wallet and refresh the page to use this application.");
      return;
    }

    const shopChain = new ethers.Contract(config[network.chainId].shopChain.address, ShopChain, provider)
    setShopChain(shopChain)

    const items = []

    for (var i = 0; i < 15; i++) {
      const item = await shopChain.items(i + 1)
      items.push(item)
      
    }

    const mobile = items.filter((item) => item.category === 'mobile')
    const furniture = items.filter((item) => item.category === 'furniture')
    const appliances = items.filter((item) => item.category === 'appliances')
    const fashion = items.filter((item) => item.category === 'fashion')
    const nutrition = items.filter((item) => item.category === 'healthcare')

    setMobile(mobile)
    setFurniture(furniture)
    setAppliances(appliances)
    setFashion(fashion)
    setNutrition(nutrition)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <h2>Shopchain Best Sellers</h2>

      {mobile && furniture && appliances && fashion && nutrition && (
        <>
          <Section title={"Housing & Furniture"} items={furniture} togglePop={togglePop} />
          <Section title={"Mobile"} items={mobile} togglePop={togglePop} />
          <Section title={"Appliances"} items={appliances} togglePop={togglePop} />
          <Section title={"Fashion"} items={fashion} togglePop={togglePop} />
          <Section title={"Nutrition & Healthcare"} items={nutrition} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} shopChain={shopChain} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;
