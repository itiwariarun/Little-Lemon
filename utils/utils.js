import { useRef, useState, useEffect, useCallback } from 'react';
import { SplashScreen } from 'expo';

export function getSectionListData(data) {
  const restructured = data.reduce((acc, item) => {
    const category = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    const existingCategory = acc.find((x) => x.name === category);

    if (existingCategory) {
      existingCategory.data.push({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
      });
    } else {
      acc.push({
        name: category,
        data: [
          {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
          },
        ],
      });
    }

    return acc;
  }, []);

  return restructured;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}

export function useFontsLoading() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Promise.all([
          require("../assets/fonts/Karla-Regular.ttf"),
          require("../assets/fonts/Karla-Medium.ttf"),
          require("../assets/fonts/Karla-Bold.ttf"),
          require("../assets/fonts/Karla-ExtraBold.ttf"),
          require("../assets/fonts/MarkaziText-Regular.ttf"),
          require("../assets/fonts/MarkaziText-Medium.ttf"),
        ]);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return onLayoutRootView;
}
