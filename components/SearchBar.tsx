import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useState, useCallback } from 'react';

interface Filter {
  id: string;
  label: string;
}

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  filters?: Filter[];
  selectedFilters?: string[];
  onFilterChange?: (filters: string[]) => void;
}

export default function SearchBar({
  placeholder = 'Search...',
  value,
  onChangeText,
  filters = [],
  selectedFilters = [],
  onFilterChange
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = useCallback((filterId: string) => {
    if (!onFilterChange) return;
    
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    onFilterChange(newFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={16} color="#94A3B8" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {filters.length > 0 && (
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <View style={styles.filterIcon}>
              <View style={[styles.filterBar, { width: 10 }]} />
              <View style={[styles.filterBar, { width: 6 }]} />
              <View style={[styles.filterBar, { width: 3 }]} />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {showFilters && filters.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilters.includes(filter.id) && styles.filterChipActive
              ]}
              onPress={() => toggleFilter(filter.id)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilters.includes(filter.id) && styles.filterChipTextActive
              ]}>
                {filter.label}
              </Text>
              {selectedFilters.includes(filter.id) && (
                <X size={12} color="#FFFFFF" style={styles.filterChipIcon} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1E293B',
    fontFamily: 'Inter-Regular',
    padding: 0,
  },
  filterButton: {
    padding: 4,
  },
  filterIcon: {
    alignItems: 'flex-end',
  },
  filterBar: {
    height: 1.5,
    backgroundColor: '#94A3B8',
    marginBottom: 1.5,
    borderRadius: 1,
  },
  filtersScroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
  },
  filterChipActive: {
    backgroundColor: '#1E3A8A',
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  filterChipIcon: {
    marginLeft: 2,
  },
});