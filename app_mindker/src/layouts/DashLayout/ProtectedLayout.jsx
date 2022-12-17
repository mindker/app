import { Navigate, useOutlet } from 'react-router-dom';

import { useAuth } from '../../custom/useAuth';

const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      pages=
      {[
        { label: 'Dashboard', path: 'dashboard' },
        { label: 'CreateDeck', path: 'createDeck' },
        { label: 'PlayPage', path: 'playPage' },
        { label: 'EditDeckDeck', path: 'editDeckPage' },
        { label: 'DetailDeck', path: 'detailDeck' },
        { label: 'CreateCard', path: 'createCard' },
      ]}
      {outlet}
    </div>
  );
};

export default ProtectedLayout;
