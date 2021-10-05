import React from 'react';
import { View, ActivityIndicator } from 'react-native';

type Props = {
  size?: 'small' | 'large',
  color?: string | undefined;
};

const Preloader: React.FC<Props> = ({ size, color }) => {
  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={size} color={color} />
        </View>
  );
};

Preloader.defaultProps = {
  size: 'large',
  color: undefined,
};

export default (Preloader);

