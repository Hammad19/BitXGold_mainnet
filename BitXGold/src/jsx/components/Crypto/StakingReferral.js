import React, { useContext, useEffect } from "react";
import { Badge, Card, Col, Row, Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { GetValuesForReferPage } from "../../../services/AxiosInstance";
import { ThemeContext } from "../../../context/ThemeContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

const StakingReferral = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state);

  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);

  // create a static value of 0.16130827463

  const [loader, setLoader] = useState(false);
  const [stakingReferalData, setStakingReferalData] = useState([]);
  const [level1count, setLevel1Count] = useState(0);
  const [level2count, setLevel2Count] = useState(0);
  const [level3count, setLevel3Count] = useState(0);

  //total usdt value

  //create handlesell

  const getFormattedDate = (date) => {
    //get only day and month in english
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    return `${day} ${month}`;
  };

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    setLoader(true);
    try {
      const latestResponse = await GetValuesForReferPage(
        state.auth.auth.walletaddress
      );

      setLevel1Count(latestResponse.level1count);
      setLevel2Count(latestResponse.level2count);
      setLevel3Count(latestResponse.level3count);
      setStakingReferalData(latestResponse.referalData);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        style: { minWidth: 180 },
      });
    }
    setLoader(false);
  };

  function copyToClipBoard() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    toast.success("Copied Referral Code: " + copyText.value, {
      position: "top-center",
      style: { minWidth: 180 },
    });
  }
  return (
    <>
      <Toaster />
      {loader ? (
        <Loader />
      ) : (
        <div
          className="row "
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}>
          <div className="col-xl-12" style={{ height: "100%" }}>
            <div className="card">
              <div className="card-body pb-2">
                <br></br>
                <h1 className="no-border font-w600 fs-60 mt-2">
                  {t("invite_your_contacts")}
                </h1>
                <p className="font-w600 fs-60 mt-2">
                  {t("invite_description")}
                </p>
                <br></br>

                <div className="row">
                  <div className="col-xl-12">
                    <div className=" mt-3 row ">
                      <div className="col-xl-10">
                        <div className="row">
                          <label>{t("refer_code_title")}</label>
                          <div className="input-group mb-3">
                            <input
                              id="myInput"
                              disabled={true}
                              value={state.auth.auth.walletaddress}
                              style={{ height: 60 }}
                              type="text"
                              className="form-control"
                            />
                            <button
                              onClick={copyToClipBoard}
                              className="btn btn-success"
                              type="button">
                              {t("copy_code_button")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>{t("refers_by_level")}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row className="text-center" lg={4}>
                  <Col lg={4}>
                    <Card.Title>{t("level_1")}</Card.Title>
                  </Col>
                  <Col lg={4}>
                    <Card.Title>{t("level_2")}</Card.Title>
                  </Col>
                  <Col lg={4}>
                    <Card.Title>{t("level_3")}</Card.Title>
                  </Col>
                </Row>

                <Row className="text-center " lg={4}>
                  <Col lg={4}>{level1count}</Col>
                  <Col lg={4}>{level2count}</Col>
                  <Col lg={4}>{level3count}</Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>{t("referred_transaction")}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{t("wallet_address")}</th>
                      <th>{t("level")}</th>
                      <th>{t("date")}</th>
                      <th>BXG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stakingReferalData.map((item, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{item.wallet_address}</td>
                          <td>
                            {" "}
                            <Badge bg="" className={"badge-success success"}>
                              {t("level")} {item.level}
                            </Badge>{" "}
                          </td>
                          <td>{getFormattedDate(item.createdAt)}</td>
                          <td className="color-primary">{item.reward} BXG</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </div>
      )}
    </>
  );
};
export default StakingReferral;
