import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./emptyTableMessage.css";

interface EmptyTableMessageProps {
  empty: boolean;
  message: string;
  buttonText?: string;
  nav?: string;
}
export default function EmptyTableMessage(props: EmptyTableMessageProps) {
  const navigate = useNavigate();

  const button = () => {
    if (!props.buttonText || !props.nav) return null;
    return (
      <Button variant='contained' onClick={() => { navigate(props.nav!) }}>{props.buttonText}</Button>
    );
  }
  
  if (!props.empty) return null;
  return (
    <div className='empty-table'>
      <div className='empty-table-text'>
        {props.message}
      </div>
      {button()}
    </div>
  );
}
