import { Stack } from 'expo-router';

export default function WMSLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Warehouse Management',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="warehouses/[id]" 
        options={{ 
          title: 'Warehouse Details',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="locations/[id]" 
        options={{ 
          title: 'Location Details',
          headerShown: false
        }} 
      />
    </Stack>
  );
}