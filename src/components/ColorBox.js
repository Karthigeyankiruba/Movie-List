export function ColorBox({ color }) {

  const styles = {
    backgroundColor: color,
    height: "35px",
    width: "258px",
    marginTop: "10px",
  };
  return (<div style={styles}></div>);
}
