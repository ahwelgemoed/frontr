import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

const ModalComp = ({ openTheModal, text, link }: any) => {
  const { push } = useHistory();
  const [openModal, setopenModal] = useState(false);
  useEffect(() => {
    if (openTheModal) {
      setopenModal(!openModal);
    }
  }, [openTheModal]);

  const handleOk = () => {
    setopenModal(false);
    return push(link);
  };
  return (
    <div>
      <Modal
        title="ERROR"
        visible={openModal}
        onOk={handleOk}
        onCancel={() => setopenModal(false)}
      >
        <p>{text}</p>
      </Modal>
    </div>
  );
};

export default ModalComp;
