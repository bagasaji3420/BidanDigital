// ══════════════════════════════════════════════════
// DATA WHO
// ══════════════════════════════════════════════════
const WHO_BBU = {
    L: {
        months: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
            53, 54, 55, 56, 57, 58, 59, 60,
        ],
        P3: [
            2.5, 3.4, 4.3, 5.0, 5.6, 6.1, 6.4, 6.7, 7.0, 7.2, 7.5, 7.7, 7.8,
            8.0, 8.2, 8.4, 8.6, 8.7, 8.9, 9.1, 9.2, 9.4, 9.5, 9.7, 9.8, 10.0,
            10.1, 10.3, 10.4, 10.5, 10.7, 10.8, 10.9, 11.1, 11.2, 11.3, 11.4,
            11.5, 11.7, 11.8, 11.9, 12.0, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6,
            12.7, 12.8, 12.9, 13.0, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7,
            13.8, 13.9,
        ],
        P15: [
            2.9, 3.9, 5.0, 5.7, 6.3, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9,
            9.1, 9.3, 9.5, 9.7, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.0, 11.2,
            11.4, 11.6, 11.7, 11.9, 12.0, 12.2, 12.3, 12.5, 12.6, 12.8, 12.9,
            13.1, 13.2, 13.4, 13.5, 13.6, 13.8, 13.9, 14.0, 14.2, 14.3, 14.4,
            14.5, 14.7, 14.8, 14.9, 15.0, 15.1, 15.3, 15.4, 15.5, 15.6, 15.7,
            15.9, 16.0, 16.1,
        ],
        P50: [
            3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6,
            9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.8, 12.0,
            12.2, 12.4, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5, 13.7, 13.8, 14.0,
            14.2, 14.3, 14.5, 14.7, 14.9, 15.1, 15.2, 15.4, 15.6, 15.7, 15.9,
            16.0, 16.2, 16.4, 16.6, 16.7, 16.9, 17.0, 17.2, 17.3, 17.5, 17.7,
            17.8, 18.0, 18.1, 18.3,
        ],
        P85: [
            3.9, 5.1, 6.3, 7.2, 7.8, 8.4, 8.9, 9.3, 9.6, 10.0, 10.3, 10.6, 10.9,
            11.1, 11.4, 11.6, 11.9, 12.1, 12.4, 12.6, 12.9, 13.1, 13.4, 13.6,
            13.9, 14.1, 14.4, 14.6, 14.8, 15.1, 15.3, 15.5, 15.8, 16.0, 16.2,
            16.4, 16.7, 16.9, 17.1, 17.3, 17.6, 17.8, 18.0, 18.2, 18.5, 18.7,
            18.9, 19.1, 19.4, 19.6, 19.8, 20.0, 20.2, 20.5, 20.7, 20.9, 21.1,
            21.4, 21.6, 21.8, 22.0,
        ],
        P97: [
            4.4, 5.8, 7.1, 8.0, 8.7, 9.3, 9.8, 10.3, 10.7, 11.0, 11.4, 11.7,
            12.0, 12.3, 12.6, 12.8, 13.1, 13.4, 13.7, 14.0, 14.2, 14.5, 14.8,
            15.1, 15.4, 15.7, 16.0, 16.2, 16.5, 16.8, 17.1, 17.3, 17.6, 17.9,
            18.1, 18.4, 18.7, 18.9, 19.2, 19.5, 19.7, 20.0, 20.2, 20.5, 20.8,
            21.0, 21.3, 21.5, 21.8, 22.0, 22.3, 22.5, 22.8, 23.0, 23.3, 23.5,
            23.8, 24.0, 24.3, 24.5, 24.8,
        ],
    },
    P: {
        months: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
            53, 54, 55, 56, 57, 58, 59, 60,
        ],
        P3: [
            2.4, 3.2, 4.0, 4.6, 5.1, 5.5, 5.8, 6.1, 6.3, 6.5, 6.7, 6.9, 7.0,
            7.2, 7.4, 7.6, 7.7, 7.9, 8.1, 8.2, 8.4, 8.6, 8.7, 8.9, 9.0, 9.2,
            9.4, 9.5, 9.7, 9.8, 10.0, 10.1, 10.3, 10.4, 10.5, 10.7, 10.8, 10.9,
            11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.8, 11.9, 12.0, 12.1, 12.2,
            12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 13.0, 13.1, 13.2, 13.3,
            13.4,
        ],
        P15: [
            2.8, 3.6, 4.5, 5.2, 5.7, 6.1, 6.5, 6.8, 7.0, 7.3, 7.5, 7.7, 7.9,
            8.1, 8.3, 8.5, 8.7, 8.9, 9.1, 9.2, 9.4, 9.6, 9.8, 10.0, 10.2, 10.3,
            10.5, 10.7, 10.9, 11.0, 11.2, 11.3, 11.5, 11.6, 11.8, 11.9, 12.1,
            12.2, 12.4, 12.5, 12.6, 12.8, 12.9, 13.0, 13.2, 13.3, 13.4, 13.5,
            13.7, 13.8, 13.9, 14.0, 14.2, 14.3, 14.4, 14.5, 14.6, 14.8, 14.9,
            15.0, 15.1,
        ],
        P50: [
            3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9,
            9.2, 9.4, 9.6, 9.8, 10.0, 10.2, 10.4, 10.6, 10.9, 11.1, 11.3, 11.5,
            11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5, 13.7,
            13.9, 14.1, 14.3, 14.5, 14.7, 14.9, 15.1, 15.3, 15.5, 15.7, 15.9,
            16.1, 16.3, 16.4, 16.6, 16.8, 17.0, 17.2, 17.3, 17.5, 17.7, 17.9,
            18.0, 18.2, 18.4,
        ],
        P85: [
            3.7, 4.8, 5.8, 6.7, 7.3, 7.8, 8.2, 8.6, 9.0, 9.3, 9.6, 9.9, 10.1,
            10.4, 10.6, 10.9, 11.1, 11.4, 11.6, 11.9, 12.1, 12.4, 12.6, 12.9,
            13.2, 13.4, 13.6, 13.9, 14.1, 14.3, 14.6, 14.8, 15.0, 15.3, 15.5,
            15.7, 16.0, 16.2, 16.4, 16.7, 16.9, 17.1, 17.4, 17.6, 17.8, 18.1,
            18.3, 18.5, 18.8, 19.0, 19.2, 19.5, 19.7, 19.9, 20.1, 20.4, 20.6,
            20.8, 21.1, 21.3, 21.5,
        ],
        P97: [
            4.2, 5.5, 6.6, 7.5, 8.2, 8.8, 9.3, 9.8, 10.2, 10.5, 10.9, 11.2,
            11.5, 11.8, 12.1, 12.4, 12.6, 12.9, 13.2, 13.5, 13.7, 14.0, 14.3,
            14.6, 14.9, 15.2, 15.5, 15.7, 16.0, 16.3, 16.6, 16.8, 17.1, 17.4,
            17.7, 17.9, 18.2, 18.5, 18.7, 19.0, 19.3, 19.5, 19.8, 20.0, 20.3,
            20.6, 20.8, 21.1, 21.3, 21.6, 21.8, 22.1, 22.3, 22.6, 22.8, 23.1,
            23.3, 23.5, 23.8, 24.0, 24.2,
        ],
    },
};

const WHO_PBU = {
    L: {
        months: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
            53, 54, 55, 56, 57, 58, 59, 60,
        ],
        P3: [
            44.2, 48.9, 52.4, 55.3, 57.6, 59.6, 61.2, 62.7, 64.0, 65.2, 66.4,
            67.6, 68.6, 69.6, 70.6, 71.6, 72.5, 73.3, 74.2, 75.0, 75.8, 76.5,
            77.2, 78.0, 78.7, 79.4, 80.1, 80.7, 81.4, 82.0, 82.7, 83.3, 83.9,
            84.5, 85.1, 85.6, 86.2, 86.7, 87.3, 87.8, 88.3, 88.8, 89.3, 89.8,
            90.3, 90.8, 91.2, 91.7, 92.1, 92.6, 93.0, 93.4, 93.9, 94.3, 94.7,
            95.1, 95.5, 95.9, 96.3, 96.7, 97.0,
        ],
        P15: [
            46.1, 50.8, 54.4, 57.3, 59.7, 61.7, 63.3, 64.8, 66.2, 67.5, 68.7,
            69.9, 70.9, 72.0, 73.0, 74.0, 74.9, 75.8, 76.7, 77.5, 78.3, 79.1,
            79.9, 80.7, 81.4, 82.1, 82.8, 83.6, 84.2, 84.9, 85.6, 86.2, 86.9,
            87.5, 88.1, 88.7, 89.3, 89.9, 90.5, 91.1, 91.6, 92.2, 92.7, 93.3,
            93.8, 94.3, 94.8, 95.4, 95.9, 96.4, 96.9, 97.3, 97.8, 98.3, 98.8,
            99.2, 99.7, 100.1, 100.6, 101.0, 101.4,
        ],
        P50: [
            49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3,
            74.5, 75.7, 76.9, 78.0, 79.1, 80.2, 81.2, 82.3, 83.2, 84.2, 85.1,
            86.0, 86.9, 87.8, 88.7, 89.5, 90.4, 91.2, 92.0, 92.9, 93.7, 94.4,
            95.2, 96.0, 96.7, 97.4, 98.2, 98.9, 99.6, 100.3, 101.0, 101.7,
            102.4, 103.0, 103.7, 104.4, 105.0, 105.6, 106.3, 106.9, 107.5,
            108.1, 108.7, 109.3, 109.8, 110.4, 111.0, 111.6, 112.1, 112.7,
        ],
        P85: [
            52.8, 57.6, 61.4, 64.5, 67.0, 69.0, 70.8, 72.5, 73.9, 75.3, 76.6,
            77.9, 79.2, 80.4, 81.5, 82.7, 83.8, 84.9, 85.9, 87.0, 88.0, 89.0,
            89.9, 90.9, 91.9, 92.8, 93.7, 94.6, 95.5, 96.4, 97.3, 98.1, 99.0,
            99.8, 100.6, 101.4, 102.2, 103.0, 103.8, 104.6, 105.3, 106.1, 106.8,
            107.6, 108.3, 109.1, 109.8, 110.5, 111.2, 111.9, 112.6, 113.3,
            114.0, 114.7, 115.3, 116.0, 116.6, 117.3, 117.9, 118.5, 119.1,
        ],
        P97: [
            54.7, 59.5, 63.3, 66.4, 69.0, 71.0, 72.9, 74.5, 76.0, 77.4, 78.8,
            80.1, 81.4, 82.6, 83.8, 85.0, 86.1, 87.2, 88.3, 89.3, 90.4, 91.4,
            92.4, 93.4, 94.4, 95.3, 96.3, 97.2, 98.1, 99.0, 99.9, 100.8, 101.7,
            102.6, 103.4, 104.2, 105.0, 105.9, 106.7, 107.5, 108.3, 109.1,
            109.9, 110.7, 111.4, 112.2, 113.0, 113.7, 114.4, 115.2, 115.9,
            116.6, 117.3, 118.0, 118.7, 119.4, 120.1, 120.8, 121.4, 122.1,
            122.7,
        ],
    },
    P: {
        months: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
            53, 54, 55, 56, 57, 58, 59, 60,
        ],
        P3: [
            43.6, 47.8, 51.0, 53.5, 55.6, 57.4, 58.9, 60.3, 61.7, 62.9, 64.1,
            65.2, 66.3, 67.3, 68.3, 69.3, 70.2, 71.1, 72.0, 72.8, 73.7, 74.5,
            75.2, 76.0, 76.7, 77.5, 78.2, 78.9, 79.6, 80.3, 81.0, 81.7, 82.3,
            82.9, 83.6, 84.2, 84.8, 85.4, 86.0, 86.5, 87.1, 87.7, 88.2, 88.7,
            89.3, 89.8, 90.3, 90.8, 91.3, 91.8, 92.3, 92.8, 93.2, 93.7, 94.1,
            94.6, 95.0, 95.5, 95.9, 96.3, 96.7,
        ],
        P15: [
            45.4, 49.7, 53.0, 55.6, 57.7, 59.6, 61.2, 62.7, 64.1, 65.4, 66.5,
            67.7, 68.9, 70.0, 71.1, 72.0, 73.0, 74.0, 74.9, 75.8, 76.7, 77.6,
            78.5, 79.3, 80.1, 81.0, 81.8, 82.6, 83.4, 84.1, 84.9, 85.7, 86.4,
            87.1, 87.8, 88.5, 89.2, 89.9, 90.6, 91.2, 91.8, 92.5, 93.1, 93.7,
            94.3, 94.9, 95.5, 96.0, 96.6, 97.2, 97.7, 98.2, 98.8, 99.3, 99.8,
            100.3, 100.8, 101.3, 101.8, 102.3, 102.7,
        ],
        P50: [
            49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5,
            72.8, 74.0, 75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7,
            84.6, 85.5, 86.4, 87.3, 88.2, 89.1, 89.9, 90.7, 91.5, 92.4, 93.2,
            93.9, 94.7, 95.4, 96.1, 96.9, 97.6, 98.3, 99.0, 99.7, 100.3, 101.0,
            101.6, 102.3, 102.9, 103.5, 104.1, 104.7, 105.3, 105.9, 106.5,
            107.0, 107.6, 108.1, 108.7, 109.2, 109.8, 110.3, 110.8,
        ],
        P85: [
            51.8, 56.5, 60.0, 62.8, 65.1, 67.1, 68.8, 70.4, 71.9, 73.3, 74.7,
            76.1, 77.4, 78.7, 79.9, 81.1, 82.3, 83.4, 84.5, 85.6, 86.7, 87.8,
            88.8, 89.9, 90.9, 91.9, 92.9, 93.9, 94.8, 95.7, 96.7, 97.6, 98.5,
            99.4, 100.3, 101.1, 102.0, 102.8, 103.7, 104.5, 105.3, 106.1, 106.9,
            107.7, 108.5, 109.2, 110.0, 110.7, 111.4, 112.2, 112.9, 113.5,
            114.2, 114.9, 115.5, 116.2, 116.8, 117.4, 118.1, 118.7, 119.3,
        ],
        P97: [
            53.5, 58.4, 61.9, 64.7, 67.1, 69.2, 71.0, 72.6, 74.1, 75.5, 76.9,
            78.3, 79.7, 81.0, 82.2, 83.5, 84.7, 85.8, 87.0, 88.1, 89.2, 90.3,
            91.3, 92.4, 93.4, 94.4, 95.4, 96.4, 97.4, 98.3, 99.3, 100.2, 101.1,
            102.0, 103.0, 103.8, 104.7, 105.6, 106.5, 107.4, 108.2, 109.1,
            110.0, 110.8, 111.6, 112.5, 113.3, 114.1, 114.9, 115.7, 116.5,
            117.2, 118.0, 118.8, 119.5, 120.2, 120.9, 121.7, 122.4, 123.1,
            123.8,
        ],
    },
};

const WHO_BBPB = {
    L: {
        lengths: [
            45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
            62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
            79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
            96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
            110,
        ],
        P3: [
            2.0, 2.1, 2.2, 2.4, 2.5, 2.6, 2.8, 2.9, 3.1, 3.2, 3.4, 3.6, 3.8,
            4.0, 4.2, 4.4, 4.6, 4.8, 5.0, 5.2, 5.4, 5.6, 5.8, 6.0, 6.2, 6.4,
            6.6, 6.8, 7.0, 7.2, 7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.6, 8.8, 9.0,
            9.2, 9.4, 9.7, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5,
            11.7, 11.9, 12.0, 12.2, 12.4, 12.6, 12.8, 12.9, 13.1, 13.3, 13.4,
            13.6, 13.8, 13.9, 14.1,
        ],
        P15: [
            2.2, 2.3, 2.5, 2.6, 2.8, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.3,
            4.5, 4.8, 5.0, 5.2, 5.4, 5.7, 5.9, 6.1, 6.3, 6.6, 6.8, 7.0, 7.2,
            7.5, 7.7, 7.9, 8.1, 8.3, 8.6, 8.8, 9.0, 9.2, 9.5, 9.7, 9.9, 10.1,
            10.4, 10.6, 10.8, 11.0, 11.3, 11.5, 11.7, 11.9, 12.1, 12.4, 12.6,
            12.8, 13.0, 13.2, 13.4, 13.6, 13.8, 14.1, 14.3, 14.5, 14.7, 14.9,
            15.1, 15.3, 15.5, 15.7, 15.9,
        ],
        P50: [
            2.5, 2.6, 2.8, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.4, 4.6, 4.9,
            5.1, 5.3, 5.6, 5.8, 6.1, 6.3, 6.6, 6.8, 7.1, 7.3, 7.6, 7.8, 8.1,
            8.3, 8.6, 8.8, 9.1, 9.3, 9.6, 9.8, 10.1, 10.3, 10.6, 10.8, 11.1,
            11.3, 11.6, 11.8, 12.1, 12.3, 12.6, 12.9, 13.1, 13.4, 13.6, 13.9,
            14.1, 14.4, 14.6, 14.9, 15.1, 15.4, 15.6, 15.9, 16.1, 16.4, 16.6,
            16.9, 17.1, 17.4, 17.6, 17.9, 18.1,
        ],
        P85: [
            2.9, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.3, 4.5, 4.8, 5.0, 5.3, 5.6,
            5.8, 6.1, 6.4, 6.7, 6.9, 7.2, 7.5, 7.8, 8.0, 8.3, 8.6, 8.9, 9.2,
            9.4, 9.7, 10.0, 10.3, 10.6, 10.8, 11.1, 11.4, 11.7, 12.0, 12.3,
            12.5, 12.8, 13.1, 13.4, 13.7, 14.0, 14.3, 14.6, 14.9, 15.2, 15.5,
            15.8, 16.1, 16.4, 16.7, 17.0, 17.3, 17.6, 17.9, 18.2, 18.5, 18.8,
            19.1, 19.4, 19.7, 20.0, 20.3, 20.6, 20.9,
        ],
        P97: [
            3.3, 3.5, 3.7, 3.9, 4.1, 4.3, 4.6, 4.9, 5.1, 5.4, 5.7, 6.0, 6.3,
            6.6, 6.9, 7.2, 7.5, 7.8, 8.1, 8.4, 8.7, 9.0, 9.3, 9.7, 10.0, 10.3,
            10.6, 10.9, 11.2, 11.5, 11.8, 12.1, 12.5, 12.8, 13.1, 13.4, 13.7,
            14.0, 14.4, 14.7, 15.0, 15.3, 15.6, 15.9, 16.3, 16.6, 16.9, 17.2,
            17.5, 17.9, 18.2, 18.5, 18.8, 19.1, 19.5, 19.8, 20.1, 20.4, 20.7,
            21.1, 21.4, 21.7, 22.0, 22.3, 22.7, 23.0,
        ],
    },
    P: {
        lengths: [
            45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
            62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
            79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
            96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
            110,
        ],
        P3: [
            1.9, 2.0, 2.1, 2.3, 2.4, 2.6, 2.7, 2.9, 3.0, 3.2, 3.4, 3.6, 3.8,
            4.0, 4.2, 4.4, 4.5, 4.7, 4.9, 5.1, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3,
            6.5, 6.6, 6.8, 7.0, 7.2, 7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.6, 8.8,
            9.0, 9.2, 9.4, 9.6, 9.8, 10.0, 10.2, 10.4, 10.6, 10.8, 11.0, 11.1,
            11.3, 11.5, 11.7, 11.9, 12.0, 12.2, 12.4, 12.6, 12.7, 12.9, 13.1,
            13.3, 13.4, 13.6, 13.8,
        ],
        P15: [
            2.1, 2.2, 2.4, 2.5, 2.7, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2,
            4.4, 4.6, 4.8, 5.0, 5.2, 5.4, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9,
            7.1, 7.3, 7.5, 7.7, 7.9, 8.1, 8.3, 8.5, 8.7, 9.0, 9.2, 9.4, 9.6,
            9.8, 10.0, 10.2, 10.4, 10.6, 10.9, 11.1, 11.3, 11.5, 11.7, 11.9,
            12.1, 12.3, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5, 13.7, 13.9, 14.1,
            14.3, 14.5, 14.7, 14.9, 15.1,
        ],
        P50: [
            2.4, 2.6, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.2, 4.4, 4.7, 4.9,
            5.2, 5.4, 5.7, 5.9, 6.2, 6.4, 6.7, 6.9, 7.2, 7.4, 7.7, 7.9, 8.2,
            8.4, 8.7, 8.9, 9.2, 9.4, 9.7, 9.9, 10.2, 10.4, 10.7, 10.9, 11.2,
            11.5, 11.7, 12.0, 12.2, 12.5, 12.7, 13.0, 13.3, 13.5, 13.8, 14.0,
            14.3, 14.6, 14.8, 15.1, 15.3, 15.6, 15.8, 16.1, 16.4, 16.6, 16.9,
            17.1, 17.4, 17.6, 17.9, 18.2, 18.4,
        ],
        P85: [
            2.8, 2.9, 3.1, 3.3, 3.5, 3.8, 4.0, 4.2, 4.5, 4.7, 5.0, 5.3, 5.5,
            5.8, 6.1, 6.4, 6.7, 6.9, 7.2, 7.5, 7.8, 8.1, 8.3, 8.6, 8.9, 9.2,
            9.5, 9.8, 10.1, 10.3, 10.6, 10.9, 11.2, 11.5, 11.8, 12.1, 12.4,
            12.6, 12.9, 13.2, 13.5, 13.8, 14.1, 14.4, 14.7, 15.0, 15.3, 15.6,
            15.9, 16.2, 16.5, 16.8, 17.1, 17.4, 17.7, 18.0, 18.3, 18.6, 18.9,
            19.2, 19.5, 19.8, 20.1, 20.4, 20.7, 21.0,
        ],
        P97: [
            3.2, 3.4, 3.6, 3.8, 4.0, 4.3, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0, 6.3,
            6.6, 6.9, 7.2, 7.5, 7.8, 8.1, 8.4, 8.8, 9.1, 9.4, 9.7, 10.0, 10.3,
            10.7, 11.0, 11.3, 11.6, 11.9, 12.2, 12.6, 12.9, 13.2, 13.5, 13.8,
            14.2, 14.5, 14.8, 15.1, 15.5, 15.8, 16.1, 16.4, 16.8, 17.1, 17.4,
            17.8, 18.1, 18.4, 18.7, 19.1, 19.4, 19.7, 20.1, 20.4, 20.7, 21.0,
            21.4, 21.7, 22.0, 22.3, 22.7, 23.0, 23.3,
        ],
    },
};

// ══════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════
let daftarAnak = [];
let anakAktifId = null;
let chartInstance = null;
let activeChart = "BBU";

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
    const rawAnak = localStorage.getItem("kia_anak");
    daftarAnak = rawAnak ? JSON.parse(rawAnak) : [];

    // Migrasi dari data lama jika ada
    const oldProfile = localStorage.getItem("babyProfile");
    const oldGrowth = localStorage.getItem("growthData");
    if (oldProfile && daftarAnak.length === 0) {
        const p = JSON.parse(oldProfile);
        const g = JSON.parse(oldGrowth) || [];
        daftarAnak.push({
            id: generateId(),
            nama: p.nama || "Anak 1",
            tglLahir: p.tglLahir,
            jk: p.jk,
            beratLahir: null,
            panjangLahir: null,
            pengukuran: g,
            vaksin: [],
        });
        simpan();
        localStorage.removeItem("babyProfile");
        localStorage.removeItem("growthData");
    }

    document.getElementById("inputTglUkur").value = new Date()
        .toISOString()
        .slice(0, 10);
    renderListAnak();
    if (daftarAnak.length > 0) pilihAnak(daftarAnak[0].id);
});

// ══════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════
function generateId() {
    return "anak_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
}

function simpan() {
    localStorage.setItem("kia_anak", JSON.stringify(daftarAnak));
}

function getAnakAktif() {
    return daftarAnak.find((a) => a.id === anakAktifId);
}

function hitungUsia(tglLahir, tglUkur = null) {
    const lahir = new Date(tglLahir);
    const ukur = tglUkur ? new Date(tglUkur) : new Date();
    const diffMs = ukur - lahir;
    const bulan = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    const hari = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24),
    );
    return {
        bulan: Math.max(0, bulan),
        hari: Math.max(0, hari),
    };
}

function hitungUmurLabel(tglLahir) {
    const { bulan, hari } = hitungUsia(tglLahir);
    const tahun = Math.floor(bulan / 12);
    const sisaBulan = bulan % 12;
    if (bulan < 1) return `${hari} hari`;
    if (tahun < 1) return `${bulan} bulan`;
    return sisaBulan > 0 ? `${tahun} thn ${sisaBulan} bln` : `${tahun} tahun`;
}

function cekStatus(tipe, jk, bulan, nilai) {
    const who = tipe === "BBU" ? WHO_BBU[jk] : WHO_PBU[jk];
    const idx = who.months.indexOf(Math.min(bulan, 60));
    if (idx < 0) return "normal";
    if (nilai < who.P3[idx]) return "kurang";
    if (nilai > who.P97[idx]) return "lebih";
    return "normal";
}

// ══════════════════════════════════════════════════
// RENDER LIST ANAK
// ══════════════════════════════════════════════════
function renderListAnak() {
    const el = document.getElementById("listAnak");
    if (daftarAnak.length === 0) {
        el.innerHTML = `<div class="text-center py-4 text-muted" style="font-size:0.85rem;">
                    <i class="bx bx-child" style="font-size:2rem; color:#dee2e6;"></i>
                    <div class="mt-2">Belum ada data anak.</div>
                    <div style="font-size:0.78rem;">Klik "Tambah Anak" untuk mulai.</div>
                </div>`;
        return;
    }
    el.innerHTML = daftarAnak
        .map((anak) => {
            const umur = hitungUmurLabel(anak.tglLahir);
            const jmlPengukuran = (anak.pengukuran || []).length;
            const avatar = anak.jk === "P" ? "👧" : "👦";
            const isActive = anak.id === anakAktifId;
            return `<div class="anak-card ${isActive ? "active" : ""}" onclick="pilihAnak('${anak.id}')">
                    <div class="d-flex align-items-center gap-2">
                        <span style="font-size:1.4rem;">${avatar}</span>
                        <div class="flex-grow-1">
                            <div class="fw-bold" style="font-size:0.82rem;">${anak.nama}</div>
                            <div class="text-muted" style="font-size:0.72rem;">${umur} · ${anak.jk === "P" ? "Perempuan" : "Laki-laki"}</div>
                        </div>
                        <span class="badge" style="background:#f0f0ff;color:#696cff;font-size:0.68rem;">${jmlPengukuran}x</span>
                    </div>
                </div>`;
        })
        .join("");
}

// ══════════════════════════════════════════════════
// PILIH ANAK
// ══════════════════════════════════════════════════
function pilihAnak(id) {
    anakAktifId = id;
    activeChart = "BBU";
    // Reset tab button
    ["BBU", "PBU", "BBPB"].forEach((t) => {
        const btn = document.getElementById("tab" + t);
        btn.className =
            t === "BBU"
                ? "btn btn-sm btn-primary"
                : "btn btn-sm btn-outline-secondary";
        btn.style.fontSize = "0.75rem";
    });
    renderListAnak();
    renderInfoAnak();
    renderChart();
    renderTabel();
    document.getElementById("cardGrafik").style.display = "block";
    document.getElementById("cardInput").style.display = "flex";
}

// ══════════════════════════════════════════════════
// RENDER INFO ANAK
// ══════════════════════════════════════════════════
function renderInfoAnak() {
    const anak = getAnakAktif();
    if (!anak) return;

    document.getElementById("infoAnakEmpty").style.display = "none";
    document.getElementById("infoAnakDetail").style.display = "block";
    document.getElementById("anakAvatar").textContent =
        anak.jk === "P" ? "👧" : "👦";
    document.getElementById("infoNamaAnak").textContent = anak.nama;
    document.getElementById("grafikNamaAnak").textContent = anak.nama;

    const tglFmt = new Date(anak.tglLahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    document.getElementById("infoTglLahir").textContent = `Lahir: ${tglFmt}`;
    document.getElementById("infoUmur").textContent = hitungUmurLabel(
        anak.tglLahir,
    );
    document.getElementById("infoBeratLahir").textContent = anak.beratLahir
        ? `${anak.beratLahir} g`
        : "—";
    document.getElementById("infoPanjangLahir").textContent = anak.panjangLahir
        ? `${anak.panjangLahir} cm`
        : "—";

    const pengukuran = anak.pengukuran || [];
    if (pengukuran.length > 0) {
        const last = pengukuran[pengukuran.length - 1];
        document.getElementById("infoBBTerakhir").textContent = `${last.bb} kg`;
        document.getElementById("infoPBTerakhir").textContent = `${last.pb} cm`;
    } else {
        document.getElementById("infoBBTerakhir").textContent = "—";
        document.getElementById("infoPBTerakhir").textContent = "—";
    }
}

// ══════════════════════════════════════════════════
// TAMBAH / EDIT / HAPUS ANAK
// ══════════════════════════════════════════════════
function showModalTambahAnak() {
    document.getElementById("modalAnakTitle").textContent = "Tambah Data Anak";
    document.getElementById("editAnakId").value = "";
    document.getElementById("inputNamaAnak").value = "";
    document.getElementById("inputTglLahir").value = "";
    document.getElementById("inputJK").value = "L";
    document.getElementById("inputBeratLahir").value = "";
    document.getElementById("inputPanjangLahir").value = "";
    new bootstrap.Modal(document.getElementById("modalAnak")).show();
}

function editAnak() {
    const anak = getAnakAktif();
    if (!anak) return;
    document.getElementById("modalAnakTitle").textContent = "Edit Data Anak";
    document.getElementById("editAnakId").value = anak.id;
    document.getElementById("inputNamaAnak").value = anak.nama;
    document.getElementById("inputTglLahir").value = anak.tglLahir;
    document.getElementById("inputJK").value = anak.jk;
    document.getElementById("inputBeratLahir").value = anak.beratLahir || "";
    document.getElementById("inputPanjangLahir").value =
        anak.panjangLahir || "";
    new bootstrap.Modal(document.getElementById("modalAnak")).show();
}

function simpanAnak() {
    const nama = document.getElementById("inputNamaAnak").value.trim();
    const tglLahir = document.getElementById("inputTglLahir").value;
    const jk = document.getElementById("inputJK").value;
    const beratLahir =
        parseFloat(document.getElementById("inputBeratLahir").value) || null;
    const panjangLahir =
        parseFloat(document.getElementById("inputPanjangLahir").value) || null;
    const editId = document.getElementById("editAnakId").value;

    if (!nama || !tglLahir) {
        Swal.fire({
            icon: "warning",
            title: "Data tidak lengkap",
            text: "Nama dan tanggal lahir wajib diisi.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    if (editId) {
        const idx = daftarAnak.findIndex((a) => a.id === editId);
        if (idx !== -1)
            daftarAnak[idx] = {
                ...daftarAnak[idx],
                nama,
                tglLahir,
                jk,
                beratLahir,
                panjangLahir,
            };
    } else {
        daftarAnak.push({
            id: generateId(),
            nama,
            tglLahir,
            jk,
            beratLahir,
            panjangLahir,
            pengukuran: [],
            vaksin: [],
        });
    }

    simpan();
    bootstrap.Modal.getInstance(document.getElementById("modalAnak")).hide();
    renderListAnak();

    if (!editId) {
        pilihAnak(daftarAnak[daftarAnak.length - 1].id);
    } else {
        renderInfoAnak();
        renderChart();
    }
    Swal.fire({
        icon: "success",
        title: "Tersimpan!",
        timer: 1200,
        showConfirmButton: false,
    });
}

function hapusAnak() {
    const anak = getAnakAktif();
    if (!anak) return;
    Swal.fire({
        title: `Hapus data ${anak.nama}?`,
        text: "Seluruh data pengukuran dan imunisasi anak ini akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed) {
            daftarAnak = daftarAnak.filter((a) => a.id !== anakAktifId);
            anakAktifId = null;
            simpan();
            renderListAnak();
            document.getElementById("infoAnakEmpty").style.display = "block";
            document.getElementById("infoAnakDetail").style.display = "none";
            document.getElementById("cardGrafik").style.display = "none";
            document.getElementById("cardInput").style.display = "none";
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
            if (daftarAnak.length > 0) pilihAnak(daftarAnak[0].id);
        }
    });
}

// ══════════════════════════════════════════════════
// TAMBAH PENGUKURAN
// ══════════════════════════════════════════════════
function tambahPengukuran() {
    const anak = getAnakAktif();
    if (!anak) return;

    const tgl = document.getElementById("inputTglUkur").value;
    const bb = parseFloat(document.getElementById("inputBB").value);
    const pb = parseFloat(document.getElementById("inputPB").value);

    if (!tgl || isNaN(bb) || isNaN(pb)) {
        Swal.fire({
            icon: "warning",
            title: "Lengkapi data pengukuran",
            confirmButtonColor: "#696cff",
        });
        return;
    }
    if (bb < 1 || bb > 30 || pb < 30 || pb > 130) {
        Swal.fire({
            icon: "warning",
            title: "Nilai tidak wajar",
            text: "Periksa kembali nilai BB dan PB.",
            confirmButtonColor: "#696cff",
        });
        return;
    }

    const { bulan } = hitungUsia(anak.tglLahir, tgl);
    const statusBBU = cekStatus("BBU", anak.jk, bulan, bb);
    const statusPBU = cekStatus("PBU", anak.jk, bulan, pb);
    const entry = {
        tgl,
        bb,
        pb,
        usiaBulan: bulan,
        statusBBU,
        statusPBU,
    };

    if (!anak.pengukuran) anak.pengukuran = [];
    const dupIdx = anak.pengukuran.findIndex((d) => d.tgl === tgl);

    const doSimpan = () => {
        if (dupIdx >= 0) anak.pengukuran[dupIdx] = entry;
        else anak.pengukuran.push(entry);
        anak.pengukuran.sort((a, b) => a.tgl.localeCompare(b.tgl));
        simpan();
        renderInfoAnak();
        renderChart();
        renderTabel();
        renderListAnak();
        tampilStatusTerakhir(entry);
        document.getElementById("inputBB").value = "";
        document.getElementById("inputPB").value = "";
        Swal.fire({
            icon: "success",
            title: "Tersimpan!",
            text: `BB ${bb} kg, PB ${pb} cm berhasil dicatat.`,
            timer: 1800,
            showConfirmButton: false,
        });
    };

    if (dupIdx >= 0) {
        Swal.fire({
            icon: "question",
            title: "Data tanggal ini sudah ada",
            text: "Apakah Anda ingin mengganti data pengukuran di tanggal ini?",
            showCancelButton: true,
            confirmButtonColor: "#696cff",
            cancelButtonColor: "#8592a3",
            confirmButtonText: "Ya, ganti",
            cancelButtonText: "Batal",
        }).then((res) => {
            if (res.isConfirmed) doSimpan();
        });
    } else {
        doSimpan();
    }
}

function tampilStatusTerakhir(entry) {
    const badgeCls = (s) =>
        s === "normal"
            ? "background:#e6f7f2;color:#0f6e56;"
            : s === "kurang"
              ? "background:#fdecea;color:#c0392b;"
              : "background:#fff8e1;color:#b8860b;";
    const badgeLabel = (s) =>
        s === "normal" ? "✅ Normal" : s === "kurang" ? "⚠️ Kurang" : "↑ Lebih";
    document.getElementById("statusBox").style.display = "block";
    document.getElementById("statusContent").innerHTML = `
                <div style="font-size:0.78rem;" class="mb-1">Usia: <strong>${entry.usiaBulan} bulan</strong></div>
                <div class="d-flex gap-2 flex-wrap mb-1">
                    <span style="font-size:0.78rem;">BB: <strong>${entry.bb} kg</strong></span>
                    <span style="padding:1px 8px;border-radius:20px;font-size:0.72rem;font-weight:600;${badgeCls(entry.statusBBU)}">${badgeLabel(entry.statusBBU)}</span>
                </div>
                <div class="d-flex gap-2 flex-wrap">
                    <span style="font-size:0.78rem;">PB: <strong>${entry.pb} cm</strong></span>
                    <span style="padding:1px 8px;border-radius:20px;font-size:0.72rem;font-weight:600;${badgeCls(entry.statusPBU)}">${badgeLabel(entry.statusPBU)}</span>
                </div>`;
}

function hapusSemuaPengukuran() {
    const anak = getAnakAktif();
    if (!anak || !anak.pengukuran?.length) return;
    Swal.fire({
        title: `Hapus semua pengukuran ${anak.nama}?`,
        text: "Seluruh riwayat pengukuran akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Ya, hapus semua",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed) {
            anak.pengukuran = [];
            simpan();
            renderInfoAnak();
            renderChart();
            renderTabel();
            renderListAnak();
            document.getElementById("statusBox").style.display = "none";
            Swal.fire({
                icon: "success",
                title: "Dihapus",
                timer: 1200,
                showConfirmButton: false,
            });
        }
    });
}

function hapusEntryPengukuran(idx) {
    const anak = getAnakAktif();
    if (!anak) return;
    const entry = anak.pengukuran[idx];
    Swal.fire({
        title: "Hapus pengukuran ini?",
        text: `BB ${entry.bb} kg — ${entry.tgl}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#8592a3",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
    }).then((res) => {
        if (res.isConfirmed) {
            anak.pengukuran.splice(idx, 1);
            simpan();
            renderInfoAnak();
            renderChart();
            renderTabel();
            renderListAnak();
        }
    });
}

// ══════════════════════════════════════════════════
// RENDER TABEL
// ══════════════════════════════════════════════════
function renderTabel() {
    const anak = getAnakAktif();
    const pengukuran = anak?.pengukuran || [];
    const emptyEl = document.getElementById("emptyPengukuran");
    const tabelEl = document.getElementById("tabelWrap");

    if (pengukuran.length === 0) {
        emptyEl.style.display = "block";
        tabelEl.style.display = "none";
        return;
    }
    emptyEl.style.display = "none";
    tabelEl.style.display = "block";

    const badgeCls = (s) =>
        s === "normal"
            ? "background:#e6f7f2;color:#0f6e56;"
            : s === "kurang"
              ? "background:#fdecea;color:#c0392b;"
              : "background:#fff8e1;color:#b8860b;";
    const badgeLabel = (s) =>
        s === "normal" ? "✅ Normal" : s === "kurang" ? "⚠️ Kurang" : "↑ Lebih";

    document.getElementById("tabelBody").innerHTML = [...pengukuran]
        .reverse()
        .map((d, i) => {
            const realIdx = pengukuran.length - 1 - i;
            const tglFmt = new Date(d.tgl).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            return `<tr>
                    <td style="font-size:0.78rem;">${tglFmt}</td>
                    <td><span style="font-size:0.72rem;background:#f0f0f0;padding:1px 8px;border-radius:20px;">${d.usiaBulan} bln</span></td>
                    <td><strong>${d.bb}</strong></td>
                    <td><strong>${d.pb}</strong></td>
                    <td><span style="padding:1px 8px;border-radius:20px;font-size:0.7rem;font-weight:600;${badgeCls(d.statusBBU)}">${badgeLabel(d.statusBBU)}</span></td>
                    <td><span style="padding:1px 8px;border-radius:20px;font-size:0.7rem;font-weight:600;${badgeCls(d.statusPBU)}">${badgeLabel(d.statusPBU)}</span></td>
                    <td>
                        <button onclick="hapusEntryPengukuran(${realIdx})" class="btn btn-sm btn-outline-danger py-0 px-2" style="font-size:0.72rem;">
                            <i class="bx bx-trash"></i>
                        </button>
                    </td>
                </tr>`;
        })
        .join("");
}

// ══════════════════════════════════════════════════
// RENDER CHART
// ══════════════════════════════════════════════════
function gantiChart(tipe) {
    activeChart = tipe;
    ["BBU", "PBU", "BBPB"].forEach((t) => {
        const btn = document.getElementById("tab" + t);
        btn.className =
            t === tipe
                ? "btn btn-sm btn-primary"
                : "btn btn-sm btn-outline-secondary";
        btn.style.fontSize = "0.75rem";
    });
    renderChart();
}

function renderChart() {
    const anak = getAnakAktif();
    const pengukuran = anak?.pengukuran || [];
    const jk = anak?.jk || "L";

    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }

    let series = [],
        xaxis = {},
        yTitle = "";

    if (activeChart === "BBU") {
        const who = WHO_BBU[jk];
        xaxis = {
            categories: who.months,
            title: {
                text: "Usia (bulan)",
            },
        };
        yTitle = "Berat Badan (kg)";
        series = [
            {
                name: "P3",
                data: who.P3,
                color: "#e74c3c",
                dashArray: 5,
            },
            {
                name: "P15",
                data: who.P15,
                color: "#f39c12",
                dashArray: 5,
            },
            {
                name: "P50",
                data: who.P50,
                color: "#27ae60",
                dashArray: 0,
            },
            {
                name: "P85",
                data: who.P85,
                color: "#f39c12",
                dashArray: 5,
            },
            {
                name: "P97",
                data: who.P97,
                color: "#e74c3c",
                dashArray: 5,
            },
            {
                name: "Bayi",
                color: "#3498db",
                dashArray: 0,
                strokeWidth: 3,
                data: who.months.map((m) => {
                    const d = pengukuran.find((x) => x.usiaBulan === m);
                    return d ? d.bb : null;
                }),
            },
        ];
    } else if (activeChart === "PBU") {
        const who = WHO_PBU[jk];
        xaxis = {
            categories: who.months,
            title: {
                text: "Usia (bulan)",
            },
        };
        yTitle = "Panjang/Tinggi Badan (cm)";
        series = [
            {
                name: "P3",
                data: who.P3,
                color: "#e74c3c",
                dashArray: 5,
            },
            {
                name: "P15",
                data: who.P15,
                color: "#f39c12",
                dashArray: 5,
            },
            {
                name: "P50",
                data: who.P50,
                color: "#27ae60",
                dashArray: 0,
            },
            {
                name: "P85",
                data: who.P85,
                color: "#f39c12",
                dashArray: 5,
            },
            {
                name: "P97",
                data: who.P97,
                color: "#e74c3c",
                dashArray: 5,
            },
            {
                name: "Bayi",
                color: "#3498db",
                dashArray: 0,
                strokeWidth: 3,
                data: who.months.map((m) => {
                    const d = pengukuran.find((x) => x.usiaBulan === m);
                    return d ? d.pb : null;
                }),
            },
        ];
    } else {
        const who = WHO_BBPB[jk];
        xaxis = {
            categories: who.lengths,
            title: {
                text: "Panjang Badan (cm)",
            },
        };
        yTitle = "Berat Badan (kg)";
        series = [
            {
                name: "P3",
                data: who.P3,
                color: "#e74c3c",
                dashArray: 5,
            },
            {
                name: "P15",
                data: who.P15,
                color: "#f39c12",
                dashArray: 5,
            },
            {
                name: "P50",
                data: who.P50,
                color: "#27ae60",
                dashArray: 0,
            },
            {
                name: "P85",
                data: who.P85,
                color: "#f39c12",
                dashArray: 5,
            },
            {
                name: "P97",
                data: who.P97,
                color: "#e74c3c",
                dashArray: 5,
            },
            {
                name: "Bayi",
                color: "#3498db",
                dashArray: 0,
                strokeWidth: 3,
                data: who.lengths.map((len) => {
                    const d = pengukuran.find((x) => Math.round(x.pb) === len);
                    return d ? d.bb : null;
                }),
            },
        ];
    }

    chartInstance = new ApexCharts(document.getElementById("chartGrowth"), {
        chart: {
            type: "line",
            height: 320,
            toolbar: {
                show: false,
            },
            animations: {
                enabled: false,
            },
        },
        series: series.map((s) => ({
            name: s.name,
            data: s.data,
        })),
        colors: series.map((s) => s.color),
        stroke: {
            width: series.map((s, i) => (i === 5 ? 3 : 1.5)),
            dashArray: series.map((s) => s.dashArray ?? 0),
            curve: "smooth",
        },
        xaxis: {
            ...xaxis,
            tickAmount: 12,
            labels: {
                style: {
                    fontSize: "11px",
                },
            },
        },
        yaxis: {
            title: {
                text: yTitle,
            },
            labels: {
                style: {
                    fontSize: "11px",
                },
            },
        },
        tooltip: {
            shared: false,
            intersect: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: "#f0f0f0",
        },
        markers: {
            size: series.map((s, i) => (i === 5 ? 5 : 0)),
            colors: ["#3498db"],
            strokeWidth: 0,
        },
    });
    chartInstance.render();
}

// ══════════════════════════════════════════════════
// LAPORAN (tab baru)
// ══════════════════════════════════════════════════
function bukaLaporanGrowth() {
    const anak = getAnakAktif();
    if (!anak) return;

    const pengukuran = anak.pengukuran || [];
    const tglCetak = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const tglLahirFmt = new Date(anak.tglLahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const badgeStyle = (s) =>
        s === "normal"
            ? "background:#e6f7f2;color:#0f6e56;"
            : s === "kurang"
              ? "background:#fdecea;color:#c0392b;"
              : "background:#faeeda;color:#854f0b;";
    const badgeLabel = (s) =>
        s === "normal"
            ? "✅ Normal"
            : s === "kurang"
              ? "⚠️ Kurang"
              : "⬆️ Lebih";

    const rows = !pengukuran.length
        ? `<tr><td colspan="6" style="text-align:center;padding:20px;color:#888;">Belum ada data pengukuran</td></tr>`
        : [...pengukuran]
              .reverse()
              .map((d, idx) => {
                  const tgl = new Date(d.tgl).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                  });
                  const bg = idx % 2 === 0 ? "#fff" : "#f4fdf9";
                  return `<tr style="background:${bg};">
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;">${tgl}</td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${d.usiaBulan} bulan</td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${d.bb} kg</td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;">${d.pb} cm</td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;"><span style="${badgeStyle(d.statusBBU)}padding:2px 8px;border-radius:20px;font-size:0.75rem;font-weight:600;">${badgeLabel(d.statusBBU)}</span></td>
                        <td style="padding:7px 10px;border:1px solid #e0e0e0;text-align:center;"><span style="${badgeStyle(d.statusPBU)}padding:2px 8px;border-radius:20px;font-size:0.75rem;font-weight:600;">${badgeLabel(d.statusPBU)}</span></td>
                    </tr>`;
              })
              .join("");

    const html = `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
<title>Laporan Pertumbuhan — ${anak.nama}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;background:#fff;padding:32px 40px;}
.header{text-align:center;border-bottom:2px solid #3aab8c;padding-bottom:16px;margin-bottom:20px;}
.header h1{font-size:1.3rem;font-weight:700;margin:4px 0;}
.header .sub{font-size:0.78rem;color:#555;}
.info{display:flex;gap:32px;font-size:0.8rem;color:#444;margin-bottom:20px;flex-wrap:wrap;}
.info div span{color:#888;display:block;font-size:0.72rem;}
table{width:100%;border-collapse:collapse;font-size:0.78rem;}
thead tr{background:#3aab8c;color:#fff;}
thead th{padding:9px 10px;border:1px solid #2e9278;font-weight:600;}
.note{margin-top:16px;font-size:0.72rem;color:#666;background:#f9fffe;border:1px solid #c8ede4;border-radius:6px;padding:10px 14px;}
.footer{margin-top:16px;font-size:0.7rem;color:#aaa;border-top:1px solid #eee;padding-top:10px;}
@media print{body{padding:16px 20px;}.no-print{display:none!important;}}
</style>
</head><body>
<div class="header">
    <div style="font-size:0.68rem;color:#888;text-transform:uppercase;letter-spacing:.1em;">Kartu Ibu &amp; Anak Digital — Kemenkes RI</div>
    <h1>Laporan Pemantauan Pertumbuhan Bayi</h1>
    <div class="sub">Dicetak: ${tglCetak}</div>
</div>
<div class="info">
    <div><span>Nama Bayi</span><strong>${anak.nama}</strong></div>
    <div><span>Jenis Kelamin</span><strong>${anak.jk === "L" ? "Laki-laki" : "Perempuan"}</strong></div>
    <div><span>Tanggal Lahir</span><strong>${tglLahirFmt}</strong></div>
    <div><span>Berat Lahir</span><strong>${anak.beratLahir ? anak.beratLahir + " g" : "-"}</strong></div>
    <div><span>Panjang Lahir</span><strong>${anak.panjangLahir ? anak.panjangLahir + " cm" : "-"}</strong></div>
    <div><span>Total Pengukuran</span><strong>${pengukuran.length}x</strong></div>
</div>
<table>
    <thead>
        <tr>
            <th style="text-align:left;">Tanggal</th>
            <th>Usia</th>
            <th>Berat (kg)</th>
            <th>Panjang (cm)</th>
            <th>Status BB/U</th>
            <th>Status PB/U</th>
        </tr>
    </thead>
    <tbody>${rows}</tbody>
</table>
<div class="note">
    <strong>Standar:</strong> WHO Child Growth Standards — acuan resmi KIA Kemenkes RI.<br>
    Normal = antara P3–P97. Kurang = di bawah P3. Lebih = di atas P97.
</div>
<div class="footer">Dicetak dari aplikasi KIA Digital · WHO Child Growth Standards 0–5 tahun</div>
<div class="no-print" style="margin-top:24px;text-align:center;">
    <button onclick="window.print()" style="background:#3aab8c;color:#fff;border:none;padding:10px 28px;border-radius:8px;font-size:0.9rem;cursor:pointer;">🖨️ Print / Simpan PDF</button>
</div>
</body></html>`;

    const tab = window.open("", "_blank");
    tab.document.write(html);
    tab.document.close();
}

// ─── EXPOSE KE GLOBAL ────────────────────────────────────────────────────────
Object.assign(window, {
    pilihAnak,
    showModalTambahAnak,
    editAnak,
    simpanAnak,
    hapusAnak,
    tambahPengukuran,
    hapusEntryPengukuran,
    hapusSemuaPengukuran,
    gantiChart,
    bukaLaporanGrowth,
});
