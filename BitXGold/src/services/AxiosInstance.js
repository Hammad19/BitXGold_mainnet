import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  //baseURL: `http://localhost:4000`,
  //baseURL: `https://api.bitx.gold`,
  baseURL: `https://ill-veil-colt.cyclic.app`,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();

  const token = state.auth.auth.idToken;
  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
});

export async function getDetailsforDashboard(wallet_address) {
  const { data } = await axiosInstance.get("/api/bxg/" + wallet_address);
  const data1 = await axiosInstance.get("/api/stake/" + wallet_address);
  const data6 = await axiosInstance.get(
    "/api/stakerefreward/" + wallet_address
  );
  const data7 = await axiosInstance.get(
    "/api/bonusrefreward/" + wallet_address
  );

  var referalbonus = 0;
  var stakingreferbonus = 0;
  //
  //filter by wallet address
  //console.log(data6.data);
  //console.log(data7.data);
  data6.data
    .filter((item) => item.refer_code?.toLowerCase() === wallet_address)
    .map((item) => {
      stakingreferbonus = stakingreferbonus + item.reward;
    });

  data7.data
    .filter((item) => item.refer_code?.toLowerCase() === wallet_address)
    .map((item) => {
      referalbonus = referalbonus + item.reward;
    });

  return {
    availableBXG: data.bxg,
    bxgStaked: data1.data.bxg,
    totalEarning: data1.data.total_claim_reward,
    referalBonus: referalbonus,
    stakingReferralBonus: stakingreferbonus,
  };
}

export default axiosInstance;
