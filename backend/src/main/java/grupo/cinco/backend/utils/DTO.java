package grupo.cinco.backend.utils;

import grupo.cinco.backend.entities.Solution;

public class DTO {
    long spendTime;
    Solution solution;

    public Solution getSolution() {
        return solution;
    }

    public void setSolution(Solution solution) {
        this.solution = solution;
    }

    public long getSpendTime() {
        return spendTime;
    }

    public void setSpendTime(long spendTime) {
        this.spendTime = spendTime;
    }
}
