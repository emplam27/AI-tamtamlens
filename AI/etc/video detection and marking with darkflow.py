import cv2
import time
from darkflow.net.build import TFNet

test_time = time.time()  # 시작 시간 저장

# darkflow 옵션
options = {"model": "cfg/my-tiny-yolo.cfg", "load": -1, "threshold": 0.6, "gpu": 0.7}
tfnet = TFNet(options)

cap = cv2.VideoCapture('kvhRhhBB5-k.mp4')
location_datas = list()
count = 0

label_object, frame_count, timestamps = dict(), 0, []
while cap.isOpened():
    capture_time = int(cap.get(cv2.CAP_PROP_POS_MSEC))                      # 프레임이 캡쳐된 시간
    frame_exists, curr_frame = cap.read()                                   # 해당 프레임 존재여부, 해당 프레임 이미지 객체
    if capture_time < 0:                                                    # 시간이 음수로 나오는 경우 제외(튀는 데이터)
        continue
    elif frame_exists:                                                      # 동영상 프레임이 존재하면
        if not frame_count % 3:
            # 프레임 시간 찍기
            timestamps.append(capture_time)
            results = tfnet.return_predict(curr_frame)
            for result in results:
                # 이미지에 라벨 마킹하기
                cv2.rectangle(curr_frame, (result["topleft"]["x"], result["topleft"]["y"]),
                              (result["bottomright"]["x"], result["bottomright"]["y"]), (255, 0, 0), 4)
                text_x, text_y = result["topleft"]["x"] - 10, result["topleft"]["y"] - 10
                cv2.putText(curr_frame, result["label"], (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)

                # 이미지 데이터 저장
                if not label_object.get(result["label"]):
                    label_object[result["label"]] = [capture_time]
                else:
                    label_object[result["label"]].append(capture_time)

            location_datas.append([capture_time, results])
            # 사진 저장(해당 부분에서 데이터 분석 시작)
            cv2.imwrite("video_capture/%s.jpg" % capture_time, curr_frame)
        frame_count += 1
    else:
        break

cap.release()

print(count)
print('캡처된 시간', timestamps)
print('등장하는 브랜드와 시간', label_object)
for key, value in label_object.items():
    print(key, value)
for location_data in location_datas:
    print(location_data)

print("time :", time.time() - test_time)  # 현재시각 - 시작시간 = 실행 시간

