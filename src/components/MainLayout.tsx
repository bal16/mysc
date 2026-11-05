import { useContext, useMemo } from "react";
import { ScoreBox } from "@/components";
import { SettingsFAB } from "./SettingsFAB";
import { ScoreContext } from "@/hooks";
import type { Team } from "@/types";

interface MainLayoutProps {
  onOpenSettings: () => void;
}

export const MainLayout = ({ onOpenSettings }: MainLayoutProps) => {
  const { state, increase, decrease } = useContext(ScoreContext);

  const teams = useMemo(() => {
    type TTeam = {
      id: Team;
      label: Team;
      value: number;
    };
    const teamA: TTeam = { id: "A", label: "A", value: state.A };
    const teamB: TTeam = { id: "B", label: "B", value: state.B };

    return state.isSwapped
      ? [
          { ...teamB, variant: "L" as const },
          { ...teamA, variant: "R" as const },
        ]
      : [
          { ...teamA, variant: "L" as const },
          { ...teamB, variant: "R" as const },
        ];
  }, [state.isSwapped, state.A, state.B]);

  return (
    <main className="relative flex h-full w-full font-brand portrait:flex-col landscape:flex-row">
      <SettingsFAB onClick={onOpenSettings} />
      {teams.map((team) => (
        <ScoreBox
          key={team.id}
          variant={team.variant}
          label={team.label}
          value={team.value}
          increaseFn={() => increase(team.id)}
          decreaseFn={() => decrease(team.id)}
        />
      ))}
    </main>
  );
};
