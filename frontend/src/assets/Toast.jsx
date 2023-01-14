import Toast from 'react-bootstrap/Toast';

function BasicExample({messg}) {
  console.log(messg)
  return (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      </Toast.Header>
      <Toast.Body>{messg}</Toast.Body>
    </Toast>
  );
}

export default BasicExample;