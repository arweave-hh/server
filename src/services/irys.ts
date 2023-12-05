import Irys from "@irys/sdk";

const getIrys =  () => {
	const url = "https://devnet.irys.xyz";
	const providerUrl = "https://rpc-mumbai.maticvigil.com";
	const token = "matic";
 
	const irys = new Irys({
		url, // URL of the node you want to connect to
		token, // Token used for payment
		key: process.env.PRIVATE_KEY, // Private key
		config: { providerUrl }, // Optional provider URL, only required when using Devnet
	});
	return irys;
};

export const irys = getIrys();
