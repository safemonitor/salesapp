import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const getButtonStyle = () => {
    let style = [styles.button];
    
    // Size
    if (size === 'sm') style.push(styles.buttonSm);
    else if (size === 'lg') style.push(styles.buttonLg);
    
    // Variant
    if (variant === 'primary') style.push(styles.buttonPrimary);
    else if (variant === 'secondary') style.push(styles.buttonSecondary);
    else if (variant === 'outline') style.push(styles.buttonOutline);
    else if (variant === 'ghost') style.push(styles.buttonGhost);
    else if (variant === 'danger') style.push(styles.buttonDanger);
    
    // Width
    if (fullWidth) style.push(styles.buttonFullWidth);
    
    // Disabled
    if (disabled || loading) style.push(styles.buttonDisabled);
    
    return style;
  };
  
  const getTextStyle = () => {
    let style = [styles.buttonText];
    
    // Size
    if (size === 'sm') style.push(styles.buttonTextSm);
    else if (size === 'lg') style.push(styles.buttonTextLg);
    
    // Variant
    if (variant === 'primary') style.push(styles.buttonTextPrimary);
    else if (variant === 'secondary') style.push(styles.buttonTextSecondary);
    else if (variant === 'outline') style.push(styles.buttonTextOutline);
    else if (variant === 'ghost') style.push(styles.buttonTextGhost);
    else if (variant === 'danger') style.push(styles.buttonTextDanger);
    
    // Disabled
    if (disabled) style.push(styles.buttonTextDisabled);
    
    return style;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'danger' ? '#FFFFFF' : '#1E3A8A'} 
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonSm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonLg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonPrimary: {
    backgroundColor: '#1E3A8A',
  },
  buttonSecondary: {
    backgroundColor: '#E0F2FE',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1E3A8A',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDanger: {
    backgroundColor: '#EF4444',
  },
  buttonFullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextSm: {
    fontSize: 14,
  },
  buttonTextLg: {
    fontSize: 18,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
  },
  buttonTextSecondary: {
    color: '#1E3A8A',
  },
  buttonTextOutline: {
    color: '#1E3A8A',
  },
  buttonTextGhost: {
    color: '#1E3A8A',
  },
  buttonTextDanger: {
    color: '#FFFFFF',
  },
  buttonTextDisabled: {
    color: '#94A3B8',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});