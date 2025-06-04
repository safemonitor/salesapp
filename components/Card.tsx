import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'flat' | 'outline';
}

export default function Card({ children, style, variant = 'default' }: CardProps) {
  const getCardStyle = () => {
    let cardStyle = [styles.card];
    
    if (variant === 'flat') cardStyle.push(styles.cardFlat);
    if (variant === 'outline') cardStyle.push(styles.cardOutline);
    
    if (style) cardStyle.push(style);
    
    return cardStyle;
  };
  
  return <View style={getCardStyle()}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardFlat: {
    shadowOpacity: 0,
    elevation: 0,
  },
  cardOutline: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});