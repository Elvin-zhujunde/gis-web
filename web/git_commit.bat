@echo off
echo ���ڳ�ʼ�� Git �ύ...
echo.

echo ����Ƿ���δ�ύ�ĸ���...
git status

echo �ݴ����...
git add .

echo �ύ����...
set /p commitMessage="�������ύ��Ϣ: "
git commit -m "%commitMessage%"

git push
echo �ύ��ɡ�
echo.
echo ��������˳�...
pause