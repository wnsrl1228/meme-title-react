import React, { createContext, useContext, useEffect, useState } from 'react';

// 로그인 상태를 저장할 컨텍스트를 생성합니다.
const AuthContext = createContext();

// 컨텍스트를 사용하기 위한 커스텀 훅을 정의합니다.
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider 컴포넌트를 정의하여 로그인 상태를 제공합니다.
export const AuthProvider = ({ children }) => {
  const initialLoggedInState = localStorage.getItem('ACCESS_TOKEN') === null ? false : true;
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);
  const [memberInfo, setMemberInfo] = useState(-1);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateMemberInfo = (memberId) => {
    setMemberInfo(memberId);
  }

  // 컴포넌트가 마운트될 때 로그인 상태를 초기화합니다.
  useEffect(() => {
    const storedLoggedInState = localStorage.getItem('ACCESS_TOKEN') === null ? false : true;
    setIsLoggedIn(storedLoggedInState);
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, updateMemberInfo ,memberInfo}}>
      {children}
    </AuthContext.Provider>
  );
};