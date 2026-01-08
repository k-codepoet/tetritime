/**
 * 시간표 셋업 페이지
 */

import { useNavigate } from 'react-router';
import { SetupWizard } from '~/components/SetupWizard';

export default function SetupPage() {
  const navigate = useNavigate();

  const handleComplete = () => {
    // 셋업 완료 후 메인 페이지로 이동
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <SetupWizard onComplete={handleComplete} onCancel={handleCancel} />
  );
}
