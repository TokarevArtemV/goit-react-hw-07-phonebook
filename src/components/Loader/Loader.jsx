import { MutatingDots } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Loader = () => {
  return (
    <>
      <MutatingDots
        visible={true}
        color="#5d5d5e"
        secondaryColor="#5d5d5e"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        height={100}
        width={100}
        wrapperStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};
