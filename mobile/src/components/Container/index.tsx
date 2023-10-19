import React from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";

type ContainerProps = {
  children: React.ReactNode;
  backgroundColor?: string;
};

const Container = ({ children, backgroundColor }: ContainerProps) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: backgroundColor,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            {children}
        </SafeAreaView>
    );
}

export default Container;