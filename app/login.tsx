import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Link, router } from 'expo-router';
import { Eye, EyeOff, LogIn } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // In a real app, perform authentication
    // For now, just navigate to the main app
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?auto=compress&cs=tinysrgb&w=300' }}
              style={styles.logoBackground}
            />
            <View style={styles.logoOverlay} />
            <Text style={styles.logoText}>DistriSales</Text>
          </View>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.headerSubtitle}>Log in to your account to continue</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#64748B" />
                ) : (
                  <Eye size={20} color="#64748B" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[
                styles.checkbox,
                rememberMe ? styles.checkboxChecked : null
              ]} />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LogIn size={20} color="#FFFFFF" />
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <Link href="/auth/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30, 58, 138, 0.7)',
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
  },
  passwordToggle: {
    paddingHorizontal: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  rememberMeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
  },
  loginButton: {
    height: 56,
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  registerLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
  },
});