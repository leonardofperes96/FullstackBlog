import styles from "./FormComponent.module.css";

const FormComponent = ({ name, value, onChange, type, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={name}
      />
    </div>
  );
};

export default FormComponent;
