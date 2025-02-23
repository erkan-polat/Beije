import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, PanResponder } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import moment from "moment";

const { height: screenHeight } = Dimensions.get('window');

const BottomSheet = () => {
  const profile = useSelector((state) => state.user.profile?.profileInfo);
  const insights = useSelector((state) => state.user.insights?.insights || []);

  const snapPoints = [screenHeight * 0.75, screenHeight * 0.5, screenHeight * 0.25];
  const translateY = useSharedValue(snapPoints[1]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  let isDragging = false;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => { isDragging = false; },
    onPanResponderMove: (_, gesture) => {
      isDragging = true;
      translateY.value = Math.max(snapPoints[2], Math.min(gesture.dy + translateY.value, snapPoints[0]));
    },
    onPanResponderRelease: () => {
      let closest = snapPoints.reduce((prev, curr) =>
        Math.abs(curr - translateY.value) < Math.abs(prev - translateY.value) ? curr : prev
      );
      translateY.value = withSpring(closest);
      isDragging = false;
    },
  });

  return (
    <Animated.View style={[styles.sheetContainer, animatedStyle]} {...panResponder.panHandlers}>
      <View style={styles.dragIndicator} />

      {/* Öne Çıkanlar Başlık */}
      <Text style={styles.title}>Bugün Öne Çıkanlar</Text>

      {/* Notlar Bölümü */}
      <View style={styles.highlightContainer}>
        <Text style={styles.subTitle}>Notlar</Text>
        <Text style={styles.noteText}>Şekerli yiyeceklerden kaçınmak, şişkinliği azaltabilir.</Text>
      </View>

      {/* İçgörüler Listesi */}
      <FlatList
        data={insights}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.insightItem}>
            <View style={styles.iconContainer}>
              <Icon name="brightness-1" size={10} color="#FF7043" />
            </View>
            <View>
              <Text style={styles.insightTitle}>{item.title}</Text>
              <Text style={styles.insightContent}>{item.content.substring(0, 50)}...</Text>
            </View>
          </View>
        )}
      />

      {/* Alt Menü */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity>
          <Icon name="autorenew" size={30} color="#FF7043" />
          <Text style={styles.menuTextActive}>Döngü</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="event-note" size={30} color="#BDBDBD" />
          <Text style={styles.menuText}>Takvim</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bar-chart" size={30} color="#BDBDBD" />
          <Text style={styles.menuText}>Analiz</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="visibility" size={30} color="#BDBDBD" />
          <Text style={styles.menuText}>Rehber</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    alignItems: 'center',
    elevation: 5,
    height: '100%',
  },
  dragIndicator: { width: 50, height: 6, backgroundColor: '#ccc', borderRadius: 3, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  subTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  highlightContainer: { backgroundColor: '#F8F8F8', padding: 10, borderRadius: 10, marginBottom: 10, width: '90%' },
  noteText: { fontSize: 14, color: '#666' },
  insightItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, backgroundColor: '#fff', marginTop: 10, width: '90%', shadowOpacity: 0.1 },
  iconContainer: { width: 10, height: 10, borderRadius: 10, backgroundColor: '#FF7043', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  insightTitle: { fontSize: 16, fontWeight: 'bold' },
  insightContent: { fontSize: 14, color: '#666' },
  bottomMenu: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, width: '100%', backgroundColor: '#fff', borderTopWidth: 1 },
  menuText: { fontSize: 12, color: '#BDBDBD' },
  menuTextActive: { fontSize: 12, color: '#FF7043', fontWeight: 'bold' },
});
