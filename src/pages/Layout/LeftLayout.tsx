import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Menu, { MenuItem } from "rc-menu";
import { motion } from "framer-motion";
import { VscTerminal, VscAdd, VscHome, VscCircleSlash } from "react-icons/vsc";
import * as logo from "./1024x1024.png";

import TerminalComp from "../../components/TerminalComp";

import {
  LeftContainer,
  HeadingImage,
  LeftBottomContainer,
  LeftBottomButtonContainer,
} from "./styles";

import packageJson from "../../../package.json";

const LeftLayout = () => {
  const { push } = useHistory();
  const [toggleTerminal, setToggleTerminal] = useState(true);
  return (
    <LeftContainer>
      <HeadingImage>
        <img
          //@ts-ignore
          src={logo}
          style={{
            width: 60,
          }}
        />
        <h1
          style={{
            // fontWeight: 900,
            fontFamily: "Josefin Sans",
          }}
        >
          FRONTR
        </h1>
      </HeadingImage>
      <div>
        <Menu mode="inline">
          <MenuItem>
            <Link to="/">
              {/* <VscHome style={{ fontSize: 14 }} /> */}
              <VscHome style={{ fontSize: 14, marginRight: 10 }} />
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/NewProject">
              <VscAdd style={{ fontSize: 14, marginRight: 10 }} />
              Style New Project
            </Link>
          </MenuItem>
        </Menu>
      </div>
      <LeftBottomContainer>
        {toggleTerminal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeOut",
              duration: 0.4,
              overflow: "hidden",
            }}
            style={{
              fontSize: 12,
              overflow: "hidden",
            }}
          >
            <TerminalComp />
          </motion.div>
        )}
        <LeftBottomButtonContainer>
          <h6>Version {packageJson.version}</h6>
          <button
            onClick={() => {
              localStorage.removeItem("USER_SETTINGS");
              setTimeout(() => {
                push("/");
              }, 2000);
            }}
            style={{
              background: "none",
              border: "none",
              alignSelf: "baseline",
              float: "right",
              width: 55,
              justifySelf: "flex-end",
            }}
          >
            <VscCircleSlash style={{ fontSize: 16 }} />
          </button>
          <button
            onClick={() => setToggleTerminal(!toggleTerminal)}
            style={{
              background: "none",
              border: "none",
              alignSelf: "baseline",
              float: "right",
              width: 55,
              justifySelf: "flex-end",
            }}
          >
            <VscTerminal style={{ fontSize: 16 }} />
          </button>
        </LeftBottomButtonContainer>
      </LeftBottomContainer>
    </LeftContainer>
  );
};

export default LeftLayout;
