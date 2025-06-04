import { View, Text, StyleSheet } from 'react-native';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusBadgeProps {
  status: StatusType;
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, text, size = 'md' }: StatusBadgeProps) {
  const getBadgeStyle = () => {
    let badgeStyle = [styles.badge];
    
    if (size === 'sm') badgeStyle.push(styles.badgeSm);
    if (size === 'lg') badgeStyle.push(styles.badgeLg);
    
    if (status === 'success') badgeStyle.push(styles.badgeSuccess);
    else if (status === 'warning') badgeStyle.push(styles.badgeWarning);
    else if (status === 'error') badgeStyle.push(styles.badgeError);
    else if (status === 'info') badgeStyle.push(styles.badgeInfo);
    
    return badgeStyle;
  };
  
  const getTextStyle = () => {
    let textStyle = [styles.text];
    
    if (size === 'sm') textStyle.push(styles.textSm);
    if (size === 'lg') textStyle.push(styles.textLg);
    
    if (status === 'success') textStyle.push(styles.textSuccess);
    else if (status === 'warning') textStyle.push(styles.textWarning);
    else if (status === 'error') textStyle.push(styles.textError);
    else if (status === 'info') textStyle.push(styles.textInfo);
    
    return textStyle;
  };
  
  return (
    <View style={getBadgeStyle()}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  badgeLg: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  badgeWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  badgeError: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  badgeInfo: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  textSm: {
    fontSize: 10,
  },
  textLg: {
    fontSize: 14,
  },
  textSuccess: {
    color: '#10B981',
  },
  textWarning: {
    color: '#F59E0B',
  },
  textError: {
    color: '#EF4444',
  },
  textInfo: {
    color: '#6366F1',
  },
});