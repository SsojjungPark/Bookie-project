import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase-config';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// AuthContext 생성
interface AuthContextType {
  currentUser: User | null;
  curentUserData: CurentUserDataType | null;
  loading: boolean;
}

interface CurentUserDataType {
  name: string;
  nickname: string;
  uid: string;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  curentUserData: null,
  loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [curentUserData, setCurrentUserData] = useState<CurentUserDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setCurrentUser(authUser);
      setLoading(false);

      if (authUser) {
        // Firebase Authentication 사용자가 로그인한 경우 firestore에서 사용자 데이터 가져오기
        try {
          const userDocRef = doc(db, 'users', authUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            setCurrentUserData(userDocSnapshot.data() as CurentUserDataType);
          }
        } catch (error) {
          console.log('firestore "users" fetching 실패: ', error);
        }
      } else {
        // 사용자가 로그아웃한 경우
        setCurrentUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser, curentUserData, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
