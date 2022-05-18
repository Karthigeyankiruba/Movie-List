import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
// hook is fuction=starts with use
// useState
// const [state,setStat]=useState(InitialValue);
// state=current scenerio-current data
// setState-informs React to update
export function Counter() {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const incrementLike= () => setLike(like + 1);
  const incrementDisLike= () => setDisLike(disLike + 1);

  useEffect(() => {
    console.log("like value :" , like);
  },[like,disLike] );

  return (
    <div>
      <IconButton onClick={incrementLike} color="primary" aria-label="like">
      <Badge badgeContent={like} color="primary">
  👍
</Badge>
</IconButton>
<IconButton onClick={incrementDisLike} color="primary" aria-label="disLike">
 <Badge badgeContent={disLike} color="error">
 👎
</Badge>
</IconButton>
     
    </div>);
}
