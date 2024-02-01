import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavouriteButton from "./FavouriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisisble, setIsVisble] = useState(!!visible);
  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisble(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisble(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if(!visible){
    return null
  }

  return (
    <div className="z-50 transititon bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto">

    </div>
  )
};

export default InfoModal;
